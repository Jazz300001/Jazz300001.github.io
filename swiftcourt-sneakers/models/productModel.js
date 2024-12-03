const mockProducts = [
    { id: 1, name: 'Air Zoom BB NXT', price: 180, description: 'Performance shoe', image: 'images/shoe1.jpg' },
    { id: 2, name: 'KD 14', price: 150, description: 'Comfortable basketball shoe', image: 'images/shoe2.jpg' },
    { id: 3, name: 'Kyrie Infinity', price: 130, description: 'Responsive shoe', image: 'images/shoe3.jpg' },
];

const db = require('../db'); 
exports.getAllProducts = () => {
    const stmt = db.prepare('SELECT * FROM Products');
    return stmt.all();  
};

exports.getProductById = (id) => {
    const stmt = db.prepare('SELECT * FROM Products WHERE id = ?');
    return stmt.get(id);  
};

exports.createProduct = (product) => {
    const stmt = db.prepare('INSERT INTO Products (name, price, description, image) VALUES (?, ?, ?, ?)');
    stmt.run(product.name, product.price, product.description, product.image);
};

exports.updateProduct = (id, product) => {
    const stmt = db.prepare('UPDATE Products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?');
    stmt.run(product.name, product.price, product.description, product.image, id);  
};

exports.deleteProduct = (id) => {
    const stmt = db.prepare('DELETE FROM Products WHERE id = ?');
    stmt.run(id);  
};
