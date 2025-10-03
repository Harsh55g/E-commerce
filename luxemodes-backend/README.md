# LuxeModes Backend

A Node.js backend server for the LuxeModes e-commerce website with MongoDB integration.

## Features

- Product management
- Order processing with MongoDB storage
- Payment system integration
- Admin dashboard for order management
- CORS enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The server will connect to `mongodb://localhost:27017/luxemodes`

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Set environment variable:
   ```bash
   export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/luxemodes"
   ```

### 3. Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/luxemodes
PORT=3001
```

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get order by ID
- `PUT /api/orders/:orderId/status` - Update order status
- `PUT /api/orders/:orderId/payment` - Update payment status

### Admin
- `GET /api/admin/orders` - Get all orders (admin view)
- `GET /api/admin/stats` - Get order statistics

## Database Schema

### Order Model
```javascript
{
  orderId: String (unique),
  customer: {
    firstName: String,
    lastName: String,
    mobile: String,
    email: String
  },
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    pincode: String
  },
  items: [{
    productId: Number,
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String,
    image: String
  }],
  payment: {
    method: String (card|upi|netbanking|cod),
    status: String (pending|completed|failed),
    cardDetails: Object
  },
  pricing: {
    subtotal: Number,
    delivery: Number,
    total: Number
  },
  status: String (pending|confirmed|shipped|delivered|cancelled),
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Render.com
1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy automatically on push

### Environment Variables for Production
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Server port (usually set by hosting platform)

## Testing

Test the API endpoints using:
- Postman
- curl commands
- Frontend integration

Example curl command:
```bash
curl -X GET http://localhost:3001/api/products
```
