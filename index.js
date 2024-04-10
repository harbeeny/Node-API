console.log("Hello there")

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from NODE API Server");
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/product/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.connect("mongodb+srv://hntrbeeny:yJ4L53n2WWAD8qR0@backend-db.f6ialfo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend-db").then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000')
    });
    console.log("Connected to database!");
}).catch(() => {
    console.log("Connection failed!");
});