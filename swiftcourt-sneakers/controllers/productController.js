const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    const products = productModel.getAllProducts();  
    res.json(products);  
};

exports.getProductById = (req, res) => {
    const product = productModel.getProductById(req.params.id);  
    res.json(product);  
};

exports.createProduct = (req, res) => {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        productModel.createProduct({ name, price, description, image });
        res.status(201).json({ message: 'Product created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.updateProduct = (req, res) => {
    res.status(200).json({ message: `Product ${req.params.id} updated successfully` });
};

exports.deleteProduct = (req, res) => {
    res.status(200).json({ message: `Product ${req.params.id} deleted successfully` });
};
