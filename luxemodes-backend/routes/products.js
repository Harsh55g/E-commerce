const express = require('express');
const router = express.Router();

// This is your product database. The frontend fetches this data.
const products = [
    { id: 1, name: "Classic Crewneck Tee", price: 35.00, image: "https://placehold.co/600x600/f0f0f0/1a1a1a?text=Tee", category: "Tops", description: "A timeless staple, this crewneck tee is crafted from ultra-soft pima cotton for a comfortable, breathable fit.", colors: ["Black", "White", "Heather Gray"], sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Denim Trucker Jacket", price: 120.00, image: "https://placehold.co/600x600/e0e0e0/1a1a1a?text=Jacket", category: "Outerwear", description: "The iconic trucker jacket, updated with a modern fit. Made from premium non-stretch denim that will break in perfectly over time.", colors: ["Vintage Blue", "Black Wash"], sizes: ["S", "M", "L"] },
    { id: 3, name: "Slim-Fit Chinos", price: 75.00, image: "https://placehold.co/600x600/f5f5f5/1a1a1a?text=Chinos", category: "Bottoms", description: "Versatile and comfortable, these slim-fit chinos are made with a touch of stretch for all-day wear.", colors: ["Khaki", "Navy", "Olive"], sizes: ["30x30", "32x32", "34x32"] },
    { id: 4, name: "Merino Wool Sweater", price: 95.00, image: "https://placehold.co/600x600/fafafa/1a1a1a?text=Sweater", category: "Tops", description: "An essential layering piece, this sweater is knit from 100% fine merino wool for exceptional warmth and softness.", colors: ["Charcoal", "Burgundy"], sizes: ["M", "L", "XL"] },
    { id: 5, name: "Leather Chelsea Boots", price: 180.00, image: "https://placehold.co/600x600/efefef/1a1a1a?text=Boots", category: "Footwear", description: "Sleek and durable, these Chelsea boots are crafted from genuine leather with a comfortable cushioned insole.", colors: ["Black", "Brown"], sizes: ["9", "10", "11"] },
    { id: 6, name: "Canvas Utility Backpack", price: 85.00, image: "https://placehold.co/600x600/e8e8e8/1a1a1a?text=Backpack", category: "Accessories", description: "A rugged and functional backpack made from durable canvas, featuring a padded laptop sleeve and multiple utility pockets.", colors: ["Forest Green", "Tan"], sizes: ["One Size"] }
];


// --- API Endpoints ---

// This handles requests to GET /api/products
router.get('/', (req, res) => {
    res.json(products);
});

// This handles requests to GET /api/products/:id (e.g., /api/products/2)
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});


module.exports = router;

