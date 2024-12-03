const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
