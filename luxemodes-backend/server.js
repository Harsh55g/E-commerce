// Import necessary packages
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001; // The port the server will run on

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
// Use the product routes for any request to '/api/products'
app.use('/api/products', productRoutes);


// A simple root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('LuxeModes Backend Server is running!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
