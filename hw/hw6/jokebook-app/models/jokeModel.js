const db = require('../db');

const getCategories = (callback) => {
  db.all('SELECT name FROM categories', [], callback);
};

const getJokesByCategory = (category, limit, callback) => {
  db.all(`SELECT setup, delivery FROM jokes 
          JOIN categories ON jokes.category_id = categories.id 
          WHERE categories.name = ? 
          LIMIT ?`, [category, limit || -1], callback);
};

const addJoke = (category, setup, delivery, callback) => {
  db.get(`SELECT id FROM categories WHERE name = ?`, [category], (err, row) => {
    if (err) return callback(err);

    if (!row) return callback(new Error('Invalid category'));

    db.run(`INSERT INTO jokes (setup, delivery, category_id) VALUES (?, ?, ?)`,
      [setup, delivery, row.id], callback);
  });
};

module.exports = { getCategories, getJokesByCategory, addJoke };
