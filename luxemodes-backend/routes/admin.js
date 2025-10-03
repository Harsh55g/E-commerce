const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders (admin view)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      orders: orders,
      total: orders.length
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

// Get order statistics
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

module.exports = router;
