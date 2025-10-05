import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// The main function to test the database connection
const testDatabaseConnection = async () => {
  console.log('--- Starting Database Connection Test ---');

  // Get the connection string from your .env file
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('\n[ERROR] MONGO_URI not found in your .env file.');
    console.log('-----------------------------------------');
    return;
  }

  console.log('Attempting to connect to MongoDB Atlas...');
  console.log('Please wait, this might take up to 30 seconds...');

  try {
    // Attempt to connect with a 30-second timeout
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000 // Timeout after 30 seconds
    });

    // If the connection is successful
    console.log('\n[SUCCESS] Successfully connected to your MongoDB database!');
    console.log(`   - Host: ${mongoose.connection.host}`);
    console.log(`   - Database: ${mongoose.connection.name}`);
    console.log('-----------------------------------------');

  } catch (error) {
    // If the connection fails
    console.error('\n[FAILURE] Could not connect to the database.');
    console.error('   - Reason:', error.message);
    console.log('\n   Possible Causes:');
    console.log('   1. Incorrect password in the MONGO_URI in your .env file.');
    console.log('   2. A local firewall or antivirus is blocking the connection.');
    console.log('   3. You are on a restricted network (like a school or company) that blocks this connection.');
    console.log('-----------------------------------------');

  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
};

// Run the test
testDatabaseConnection();
