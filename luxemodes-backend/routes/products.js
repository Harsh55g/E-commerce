import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Fetch all products from the database
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Find all documents in the 'Product' collection
    const products = await Product.find({});
    
    // Send the products back as a JSON response
    res.json(products);
  } catch (error) {
    // If an error occurs, log it and send a 500 server error response
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error while fetching products.' });
  }
});

export default router;
