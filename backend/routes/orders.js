const express = require('express');
const router = express.Router();
const { Order, ORDER_STATUS } = require('../models/Order');
const { adminAuth } = require('../middleware/auth');

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, orderType, invoiceLink, phone } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !orderType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (orderType === 'personal' && !invoiceLink) {
      return res.status(400).json({ error: 'Invoice link is required for personal orders' });
    }

    if (orderType === 'premade' && !phone) {
      return res.status(400).json({ error: 'Phone number is required for premade orders' });
    }

    // Create order
    const order = Order.create({
      firstName,
      lastName,
      email,
      orderType,
      invoiceLink: orderType === 'personal' ? invoiceLink : null,
      phone: orderType === 'premade' ? phone : null,
      status: ORDER_STATUS.PENDING
    });

    res.status(201).json({
      success: true,
      order: order.toJSON()
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

/**
 * GET /api/orders
 * Get all orders (admin only)
 */
router.get('/', adminAuth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = Order.findAll(filter);
    
    res.json({
      success: true,
      count: orders.length,
      orders: orders.map(o => o.toJSON())
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * GET /api/orders/:id
 * Get a specific order
 */
router.get('/:id', async (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      order: order.toJSON()
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

/**
 * PATCH /api/orders/:id
 * Update order status (admin only)
 */
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const updates = {};

    if (status) {
      if (!Object.values(ORDER_STATUS).includes(status)) {
        return res.status(400).json({ error: 'Invalid order status' });
      }
      updates.status = status;
    }

    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
    }

    const order = Order.update(req.params.id, updates);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      order: order.toJSON()
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

/**
 * DELETE /api/orders/:id
 * Delete an order (admin only)
 */
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const deleted = Order.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
