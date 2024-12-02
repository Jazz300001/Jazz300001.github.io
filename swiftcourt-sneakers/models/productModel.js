const mockProducts = [
    { id: 1, name: 'Air Zoom BB NXT', price: 180, description: 'Performance shoe', image: 'images/shoe1.jpg' },
    { id: 2, name: 'KD 14', price: 150, description: 'Comfortable basketball shoe', image: 'images/shoe2.jpg' },
    { id: 3, name: 'Kyrie Infinity', price: 130, description: 'Responsive shoe', image: 'images/shoe3.jpg' },
];

exports.getAllProducts = () => mockProducts;

exports.getProductById = (id) => mockProducts.find(product => product.id === parseInt(id));
const db = require('../db');

exports.getAllProducts = () => {
    const stmt = db.prepare('SELECT * FROM Products');
    return stmt.all();
};

exports.getProductById = (id) => {
    const stmt = db.prepare('SELECT * FROM Products WHERE id = ?');
    return stmt.get(id);
};

