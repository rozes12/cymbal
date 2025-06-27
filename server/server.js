// Filename: server.js (or app.js)

// Import necessary modules
const express = require('express');
const cors = require('cors'); // Used to allow requests from your frontend's domain
const bodyParser = require('body-parser'); // Used to parse JSON data sent in request bodies

// Initialize the Express application
const app = express();
const PORT = 3001; // The port your backend server will listen on. You can choose any available port.

// --- In-memory "Database" for Demonstration ---
// In a real production application, this would be replaced by a proper database
// (e.g., Google Cloud Firestore, MongoDB, PostgreSQL, etc.)
// This global array simulates a single shopping cart on the server.
const serverCart = [];

// --- Middleware Setup ---

// Enable CORS (Cross-Origin Resource Sharing)
// This is crucial! It allows your frontend (which might be on a different domain/port)
// to make requests to this backend server.
app.use(cors());

// Use body-parser middleware to parse incoming JSON request bodies.
// This allows you to access data sent from your frontend using req.body.
app.use(bodyParser.json());

// --- API Endpoints ---

// POST /api/add-to-cart endpoint
// This is the endpoint your React frontend will call when a user clicks "Add to Cart".
app.post('/api/add-to-cart', (req, res) => {
    // Extract productId and quantity from the request body.
    // These are the values sent from your frontend's cartStore.js
    const { productId, quantity } = req.body;

    // --- Input Validation ---
    // Basic validation to ensure required data is present and valid.
    if (!productId || typeof quantity === 'undefined' || quantity <= 0) {
        // If data is invalid, send a 400 Bad Request response.
        return res.status(400).json({ success: false, message: 'Invalid product ID or quantity provided.' });
    }

    // --- Simulate Cart Logic ---
    // Find if the product already exists in our in-memory serverCart.
    const existingItemIndex = serverCart.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
        // If the item already exists in the cart, increment its quantity.
        // We add the 'quantity' received from the frontend (which is usually 1 for an add-to-cart click).
        serverCart[existingItemIndex].quantity += quantity;
    } else {
        // If the item is new to the cart, add it as a new entry.
        serverCart.push({ productId, quantity });
    }

    // Log the current state of the server-side cart to the console for debugging.
    console.log('Product ID: ${productId}, Quantity: ${quantity} added to cart.');
    console.log('Current Server Cart State:', serverCart);

    // --- Send Response to Frontend ---
    // Send a 200 OK response back to the frontend, indicating success.
    // Include the current state of the server cart for confirmation (optional, but good for debugging).
    res.status(200).json({
        success: true,
        message: 'Item successfully added to server cart!',
        currentServerCart: serverCart // You can send back whatever data is useful for your frontend
    });
});

// GET /api/cart endpoint (Optional, for debugging/verification)
// You can hit this endpoint with your browser or a tool like Postman to see the current serverCart state.
app.get('/api/cart', (req, res) => {
    console.log('Serving current cart state.');
    res.status(200).json({
        success: true,
        cart: serverCart
    });
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log('Backend server running on http://localhost:${PORT}');
    console.log("Add to Cart API endpoint ready at http://localhost:${PORT}/api/add-to-cart");
    console.log('Remember to replace in-memory cart with a database for production!');
});