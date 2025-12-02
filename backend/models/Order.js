const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'orders.json');

// Initialize orders file and data directory if they don't exist
function initializeData() {
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  // Initialize orders file if it doesn't exist
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// Read all orders from file
function readOrders() {
  initializeData();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

// Write orders to file (using writeFileSync for simplicity in this use case)
// Note: For high-traffic scenarios, consider using a database instead
function writeOrders(orders) {
  initializeData();
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}

// Order status values
const ORDER_STATUS = {
  PENDING: 'pending',
  AWAITING_PAYMENT: 'awaiting_payment',
  PAID: 'paid',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed'
};

// Payment status values (from NOWPayments)
const PAYMENT_STATUS = {
  WAITING: 'waiting',
  CONFIRMING: 'confirming',
  CONFIRMED: 'confirmed',
  SENDING: 'sending',
  PARTIALLY_PAID: 'partially_paid',
  FINISHED: 'finished',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  EXPIRED: 'expired'
};

class Order {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.orderType = data.orderType; // 'personal' or 'premade'
    this.invoiceLink = data.invoiceLink || null;
    this.phone = data.phone || null;
    this.status = data.status || ORDER_STATUS.PENDING;
    this.paymentStatus = data.paymentStatus || null;
    this.paymentId = data.paymentId || null;
    this.paymentUrl = data.paymentUrl || null;
    this.amount = data.amount || 2500000; // Default price in Tomans
    this.amountUSD = data.amountUSD || null;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Save order to database
  save() {
    const orders = readOrders();
    const existingIndex = orders.findIndex(o => o.id === this.id);
    
    this.updatedAt = new Date().toISOString();
    
    if (existingIndex >= 0) {
      orders[existingIndex] = this.toJSON();
    } else {
      orders.push(this.toJSON());
    }
    
    writeOrders(orders);
    return this;
  }

  // Convert to plain object
  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      orderType: this.orderType,
      invoiceLink: this.invoiceLink,
      phone: this.phone,
      status: this.status,
      paymentStatus: this.paymentStatus,
      paymentId: this.paymentId,
      paymentUrl: this.paymentUrl,
      amount: this.amount,
      amountUSD: this.amountUSD,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Static methods
  static findAll(filter = {}) {
    let orders = readOrders();
    
    if (filter.status) {
      orders = orders.filter(o => o.status === filter.status);
    }
    if (filter.paymentStatus) {
      orders = orders.filter(o => o.paymentStatus === filter.paymentStatus);
    }
    
    // Sort by newest first
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return orders.map(data => new Order(data));
  }

  static findById(id) {
    const orders = readOrders();
    const orderData = orders.find(o => o.id === id);
    return orderData ? new Order(orderData) : null;
  }

  static findByPaymentId(paymentId) {
    const orders = readOrders();
    const orderData = orders.find(o => o.paymentId === paymentId);
    return orderData ? new Order(orderData) : null;
  }

  static create(data) {
    const order = new Order(data);
    return order.save();
  }

  static update(id, updates) {
    const order = Order.findById(id);
    if (!order) return null;
    
    Object.keys(updates).forEach(key => {
      if (order.hasOwnProperty(key) && key !== 'id' && key !== 'createdAt') {
        order[key] = updates[key];
      }
    });
    
    return order.save();
  }

  static delete(id) {
    const orders = readOrders();
    const filteredOrders = orders.filter(o => o.id !== id);
    
    if (filteredOrders.length === orders.length) {
      return false; // Order not found
    }
    
    writeOrders(filteredOrders);
    return true;
  }
}

module.exports = { Order, ORDER_STATUS, PAYMENT_STATUS };
