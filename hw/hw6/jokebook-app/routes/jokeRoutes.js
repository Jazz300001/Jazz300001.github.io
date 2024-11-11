const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.get('/categories', jokeController.getCategories);
router.get('/joke/:category', jokeController.getJokesByCategory);
router.post('/joke/new', jokeController.addJoke);
//USE http://localhost:3000/jokebook/categories
//http://localhost:3000/jokebook/joke/funnyJoke
// http://localhost:3000/jokebook/joke/new
// joke format {
//  "category": "funnyJoke",
//  "setup": "test",
//  "delivery": "test"
//}
module.exports = router;
