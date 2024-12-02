const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    const products = productModel.getAllProducts();
    res.json(products);
};

exports.getProductById = (req, res) => {
    const product = productModel.getProductById(req.params.id);
    res.json(product);
};
