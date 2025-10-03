const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String }
  },
  address: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  items: [{
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true }
  }],
  payment: {
    method: { type: String, required: true, enum: ['card', 'upi', 'netbanking', 'cod'] },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'failed'] },
    cardDetails: {
      cardNumber: String,
      expiry: String,
      cvv: String,
      cardholderName: String
    }
  },
  pricing: {
    subtotal: { type: Number, required: true },
    delivery: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
