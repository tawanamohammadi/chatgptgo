const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const { Order, ORDER_STATUS, PAYMENT_STATUS } = require('../models/Order');

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

/**
 * POST /api/payment/create
 * Create a new payment invoice with NOWPayments
 */
router.post('/create', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const order = Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'Payment gateway not configured' });
    }

    // Create invoice with NOWPayments
    const invoiceData = {
      price_amount: order.amount / 60000, // Convert Tomans to USD (approximate rate)
      price_currency: 'usd',
      order_id: order.id,
      order_description: `ChatGPT Go - ${order.orderType === 'personal' ? 'Personal Email' : 'Pre-made Account'} for ${order.email}`,
      ipn_callback_url: `${process.env.FRONTEND_URL || 'https://chatgptgo.tawana.online'}/api/payment/webhook`,
      success_url: `${process.env.FRONTEND_URL || 'https://chatgptgo.tawana.online'}?payment=success&order=${order.id}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://chatgptgo.tawana.online'}?payment=cancelled&order=${order.id}`
    };

    const response = await axios.post(`${NOWPAYMENTS_API_URL}/invoice`, invoiceData, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    // Update order with payment information
    Order.update(order.id, {
      status: ORDER_STATUS.AWAITING_PAYMENT,
      paymentId: response.data.id,
      paymentUrl: response.data.invoice_url,
      amountUSD: invoiceData.price_amount,
      paymentStatus: PAYMENT_STATUS.WAITING
    });

    res.json({
      success: true,
      paymentUrl: response.data.invoice_url,
      paymentId: response.data.id,
      amount: invoiceData.price_amount,
      currency: 'USD'
    });
  } catch (error) {
    console.error('Error creating payment:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create payment',
      details: error.response?.data?.message || error.message
    });
  }
});

/**
 * POST /api/payment/webhook
 * Handle IPN (Instant Payment Notification) from NOWPayments
 */
router.post('/webhook', async (req, res) => {
  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    
    if (!ipnSecret || ipnSecret === 'your_ipn_secret_here') {
      console.warn('IPN Secret not configured, skipping signature verification');
    } else {
      // Verify IPN signature
      const signature = req.headers['x-nowpayments-sig'];
      if (signature) {
        const sortedBody = JSON.stringify(sortObject(req.body));
        const hmac = crypto.createHmac('sha512', ipnSecret);
        hmac.update(sortedBody);
        const calculatedSignature = hmac.digest('hex');

        if (signature !== calculatedSignature) {
          console.error('Invalid IPN signature');
          return res.status(400).json({ error: 'Invalid signature' });
        }
      }
    }

    const { 
      order_id, 
      payment_status, 
      payment_id,
      pay_amount,
      actually_paid,
      pay_currency
    } = req.body;

    console.log('Received IPN:', {
      order_id,
      payment_status,
      payment_id,
      pay_amount,
      actually_paid,
      pay_currency
    });

    // Find and update order
    const order = Order.findById(order_id);
    if (!order) {
      console.error('Order not found for IPN:', order_id);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Map payment status to order status
    let orderStatus = order.status;
    if (payment_status === 'finished') {
      orderStatus = ORDER_STATUS.PAID;
    } else if (payment_status === 'failed' || payment_status === 'expired') {
      orderStatus = ORDER_STATUS.FAILED;
    } else if (payment_status === 'confirmed' || payment_status === 'confirming') {
      orderStatus = ORDER_STATUS.AWAITING_PAYMENT;
    }

    Order.update(order.id, {
      paymentStatus: payment_status,
      status: orderStatus,
      paymentId: payment_id || order.paymentId
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

/**
 * GET /api/payment/status/:id
 * Check payment status
 */
router.get('/status/:id', async (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If we have a payment ID, fetch latest status from NOWPayments
    if (order.paymentId) {
      const apiKey = process.env.NOWPAYMENTS_API_KEY;
      
      if (apiKey && apiKey !== 'your_api_key_here') {
        try {
          const response = await axios.get(`${NOWPAYMENTS_API_URL}/payment/${order.paymentId}`, {
            headers: {
              'x-api-key': apiKey
            }
          });

          // Update order with latest payment status
          if (response.data.payment_status !== order.paymentStatus) {
            let orderStatus = order.status;
            if (response.data.payment_status === 'finished') {
              orderStatus = ORDER_STATUS.PAID;
            } else if (response.data.payment_status === 'failed' || response.data.payment_status === 'expired') {
              orderStatus = ORDER_STATUS.FAILED;
            }

            Order.update(order.id, {
              paymentStatus: response.data.payment_status,
              status: orderStatus
            });

            return res.json({
              success: true,
              orderId: order.id,
              orderStatus: orderStatus,
              paymentStatus: response.data.payment_status,
              paymentUrl: order.paymentUrl
            });
          }
        } catch (apiError) {
          console.error('Error fetching payment status from NOWPayments:', apiError.message);
          // Continue with cached status
        }
      }
    }

    res.json({
      success: true,
      orderId: order.id,
      orderStatus: order.status,
      paymentStatus: order.paymentStatus,
      paymentUrl: order.paymentUrl
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

// Helper function to sort object keys for signature verification
function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])
        ? sortObject(obj[key])
        : obj[key];
      return result;
    }, {});
}

module.exports = router;
