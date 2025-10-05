import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    // The frontend sends the complete order data in the request body
    const orderData = req.body;

    // Generate a simple, unique, human-readable Order ID
    // Example: LM-1728394051-847
    const uniqueId = `LM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create a new order document using the Mongoose model
    const newOrder = new Order({
      ...orderData,
      orderId: uniqueId, // Add our generated ID
      status: 'Placed',  // Set the initial status
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();
    
    // Send a success response back to the frontend
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully!',
      orderId: savedOrder.orderId 
    });

  } catch (error) {
    // If an error occurs, log it and send a 500 server error response
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating order.' 
    });
  }
});

export default router;
