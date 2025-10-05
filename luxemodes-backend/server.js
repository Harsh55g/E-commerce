// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

// --- Initial Configuration ---
// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// 1. CORS (Cross-Origin Resource Sharing)
// This is crucial for security. It allows your Netlify frontend 
// to make requests to this backend server on Render.
app.use(cors());

// 2. JSON Body Parser
// This allows the server to accept and parse JSON data in request bodies.
app.use(express.json());


// --- API Routes ---
// The server will use the imported route handlers for specific API paths.
// Any request starting with '/api/products' will be handled by productRoutes.
app.use('/api/products', productRoutes);

// Any request starting with '/api/orders' will be handled by orderRoutes.
app.use('/api/orders', orderRoutes);


// --- Server Listener ---
// Starts the server and listens for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
