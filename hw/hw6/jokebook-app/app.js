const express = require('express');
const app = express();
const jokeRoutes = require('./routes/jokeRoutes');

app.use(express.json());
app.use('/jokebook', jokeRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
