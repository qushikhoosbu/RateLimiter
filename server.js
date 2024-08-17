require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Database');
    })
    .catch(err => {
        console.error('Error connecting to Database:',err.toString());
    });

// Load routes
const productsRouter = require('./routes/products.js');
app.use('/products', productsRouter);

// Start the server
app.listen(3001, () => {
    console.log('Server Started on port 3000');
});