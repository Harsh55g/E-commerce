const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string from environment variables
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.warn('MONGODB_URI environment variable is not set - running without database');
      return false;
    }
    
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed, running without database:', error.message);
    return false;
  }
};

module.exports = connectDB;
