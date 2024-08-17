const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const rateLimiter = require('../middleware/rateLimiter');

// Apply rate limiter to all routes in this router
router.use(rateLimiter(1000, 2)); //Limits to 2 requests per second per IP per route



// Apply rate limiter to the GET all products route
router.get('/rateLimitToSpecificRoute', rateLimiter(1000, 2), async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all products
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// POST a new product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        productType: req.body.productType,
        releaseDate: req.body.releaseDate,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT (replace) a product
router.put('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a product
router.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await Product.findByIdAndDelete(productId);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET a specific product by ID
router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH (update) a product
router.patch('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
