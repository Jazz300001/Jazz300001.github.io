const jokeModel = require('../models/jokeModel');

const getCategories = (req, res) => {
  jokeModel.getCategories((err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve categories' });
    res.json(rows);
  });
};

const getJokesByCategory = (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query, 10000000000);
  jokeModel.getJokesByCategory(category, limit, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve jokes' });
    if (rows.length === 0) return res.status(404).json({ error: 'Invalid category' });
    res.json(rows);
  });
};
//USE http://localhost:3000/jokebook/categories
// http://localhost:3000/jokebook/joke/funnyJoke
// http://localhost:3000/jokebook/joke/new
// joke format {
//  "category": "funnyJoke",
//  "setup": "test",
//  "delivery": "test"
//}
const addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  jokeModel.addJoke(category, setup, delivery, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add joke' });
    getJokesByCategory({ params: { category } }, res);
  });
};

module.exports = { getCategories, getJokesByCategory, addJoke };
