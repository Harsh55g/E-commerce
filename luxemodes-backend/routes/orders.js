const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    // Generate unique order ID
    const orderId = 'LM' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    const orderData = {
      orderId,
      customer: req.body.customer,
      address: req.body.address,
      items: req.body.items,
      payment: req.body.payment,
      pricing: req.body.pricing,
      status: 'pending'
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: order.orderId,
      order: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      orders: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { 
        status: status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// Update payment status
router.put('/:orderId/payment', async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { 
        'payment.status': paymentStatus,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      order: order
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status',
      error: error.message
    });
  }
});

module.exports = router;
