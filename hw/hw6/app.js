const express = require('express');
const bodyParser = require('body-parser');
const jokeRoutes = require('./routes/jokeRoutes');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'pug'); 

app.get('/', (req, res) => {
    
});

app.use('/jokebook', jokeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
