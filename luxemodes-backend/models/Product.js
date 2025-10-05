import mongoose from 'mongoose';

// Defines the structure for product data in the MongoDB collection.
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Product must have a name
    trim: true      // Removes whitespace from both ends
  },
  price: {
    type: Number,
    required: true, // Product must have a price
    min: 0          // Price cannot be negative
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true // URL for the product image
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  colors: {
    type: [String], // An array of available color names
    required: true
  },
  sizes: {
    type: [String], // An array of available sizes
    required: true
  }
}, {
  // Automatically adds `createdAt` and `updatedAt` timestamp fields
  timestamps: true 
});

// Creates a Mongoose model named 'Product' based on the schema.
// Mongoose will automatically create a collection named 'products' (plural and lowercase).
const Product = mongoose.model('Product', productSchema);

export default Product;
