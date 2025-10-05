import mongoose from 'mongoose';

// Defines the structure for individual items within an order.
const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
});

// Defines the main structure for an order in the MongoDB collection.
const orderSchema = new mongoose.Schema({
  orderId: { // A custom, human-readable order ID
    type: String,
    required: true,
    unique: true // Ensures no two orders have the same ID
  },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  address: {
    address1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  items: [orderItemSchema], // An array of items, structured by the schema above
  payment: {
    method: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' }
  },
  pricing: {
    subtotal: { type: Number, required: true },
    delivery: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true }
  },
  status: {
    type: String,
    required: true,
    default: 'Placed' // Initial status of a new order
  }
}, {
  timestamps: true // Adds `createdAt` and `updatedAt` fields
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
