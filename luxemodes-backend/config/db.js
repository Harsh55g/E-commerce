import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Establishes a connection to the MongoDB database using the connection string
 * from the environment variables.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log a success message if the connection is established
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log an error message and exit the process if the connection fails
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with a non-zero status code to indicate failure
  }
};

export default connectDB;
