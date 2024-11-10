const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./jokebook.db');

exports.getCategories = (callback) => {
    db.all("SELECT name FROM Categories", [], (err, rows) => {
        callback(err, rows);
    });
};

exports.getJokesByCategory = (category, limit, callback) => {
    const query = "SELECT setup, delivery FROM Jokes WHERE category_id = (SELECT id FROM Categories WHERE name = ?) LIMIT ?";
    db.all(query, [category, limit], (err, rows) => {
        callback(err, rows);
    });
};

exports.addJoke = (category, setup, delivery, callback) => {
    db.run(
        "INSERT INTO Jokes (setup, delivery, category_id) VALUES (?, ?, (SELECT id FROM Categories WHERE name = ?))",
        [setup, delivery, category],
        function(err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        }
    );
};
