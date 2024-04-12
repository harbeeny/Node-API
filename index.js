console.log("Hello there")

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }
        
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        
        const product = await Product.findByIdAndDelete(id);
        
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted successfully"});

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