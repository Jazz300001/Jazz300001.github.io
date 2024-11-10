const JokeModel = require('../models/jokeModel');

exports.getCategories = (req, res) => {
    JokeModel.getCategories((err, categories) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(categories);
    });
};

exports.getJokesByCategory = (req, res) => {
    const { category } = req.params;
    const limit = req.query.limit || 10;

    JokeModel.getJokesByCategory(category, limit, (err, jokes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (jokes.length === 0) return res.status(404).json({ error: "Category not found" });
        res.json(jokes);
    });
};

exports.addJoke = (req, res) => {
    const { category, setup, delivery } = req.body;

    if (!category || !setup || !delivery) {
        return res.status(400).json({ error: "All fields are required" });
    }

    JokeModel.addJoke(category, setup, delivery, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        JokeModel.getJokesByCategory(category, 10, (err, jokes) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(jokes);
        });
    });
};
