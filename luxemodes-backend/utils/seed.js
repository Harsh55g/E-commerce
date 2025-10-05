import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

// Load environment variables
dotenv.config();

// Sample product data to populate the database
const products = [
  { name: "Classic Crewneck Tee", price: 35.00, description: "A timeless staple, this crewneck tee is crafted from ultra-soft pima cotton for a comfortable, breathable fit.", image: "https://placehold.co/600x600/f0f0f0/1a1a1a?text=Tee", category: "Tops", colors: ["Black", "White", "Heather Grey"], sizes: ["S", "M", "L", "XL"] },
  { name: "Vintage Denim Jacket", price: 120.00, description: "A perfectly worn-in denim jacket with a classic cut. Features durable hardware and a versatile vintage wash.", image: "https://placehold.co/600x600/e0e0e0/1a1a1a?text=Jacket", category: "Outerwear", colors: ["Vintage Blue"], sizes: ["S", "M", "L"] },
  { name: "Modern Slim-Fit Chinos", price: 75.00, description: "Our best-selling chinos, tailored for a modern slim fit with a touch of stretch for all-day comfort.", image: "https://placehold.co/600x600/f5f5f5/1a1a1a?text=Chinos", category: "Bottoms", colors: ["Khaki", "Navy", "Olive"], sizes: ["30x30", "32x32", "34x32"] },
  { name: "Merino Wool Sweater", price: 95.00, description: "Made from 100% fine merino wool, this sweater is lightweight, warm, and perfect for layering.", image: "https://placehold.co/600x600/fafafa/1a1a1a?text=Sweater", category: "Tops", colors: ["Charcoal", "Burgundy"], sizes: ["M", "L", "XL"] },
  { name: "Performance Tech Shorts", price: 55.00, description: "Engineered for movement, these shorts feature a moisture-wicking fabric and a secure zip pocket.", image: "https://placehold.co/600x600/cccccc/1a1a1a?text=Shorts", category: "Athletic", colors: ["Black", "Graphite"], sizes: ["S", "M", "L"] },
  { name: "Linen Button-Down Shirt", price: 80.00, description: "Stay cool and comfortable in this breezy linen shirt, perfect for warm weather and casual occasions.", image: "https://placehold.co/600x600/e5e5e5/1a1a1a?text=Shirt", category: "Tops", colors: ["White", "Light Blue"], sizes: ["S", "M", "L", "XL"] }
];

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Main function to import data
const importData = async () => {
  try {
    // Clear existing products to avoid duplicates
    await Product.deleteMany();
    console.log('Data Cleared!');

    // Insert the sample product data into the database
    await Product.insertMany(products);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

// Run the seeder
const run = async () => {
  await connectDB();
  await importData();
};

run();
