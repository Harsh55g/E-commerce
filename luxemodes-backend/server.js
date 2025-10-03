// Import necessary packages
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Load environment variables
require('dotenv').config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000; // The port the server will run on

// Middleware
// Enable Cross-Origin Resource Sharing (CORS) so your frontend can communicate with this backend
app.use(cors({
  origin: [
    'https://transcendent-bubblegum-74b190.netlify.app',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
})); 
// Enable the server to parse JSON formatted request bodies
app.use(express.json()); 

// --- API Routes ---
// Import the product routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

// Use the product routes for any request to '/api/products'
app.use('/api/products', productRoutes);
// Use the order routes for any request to '/api/orders'
app.use('/api/orders', orderRoutes);
// Use the admin routes for any request to '/api/admin'
app.use('/api/admin', adminRoutes);


// A simple root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('LuxeModes Backend Server is running!');
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Start the server first
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
      console.log('Server started successfully');
    });
    
    // Try to connect to MongoDB (non-blocking)
    const dbConnected = await connectDB();
    if (dbConnected) {
      console.log('✅ MongoDB connected successfully - All features available');
    } else {
      console.log('⚠️  Running without database - Products API works, Orders API disabled');
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
