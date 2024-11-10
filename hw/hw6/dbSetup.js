const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./jokebook.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Jokes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            setup TEXT NOT NULL,
            delivery TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES Categories(id)
        )
    `);

    db.run(`INSERT OR IGNORE INTO Categories (name) VALUES ('funnyJoke'), ('lameJoke')`);
    db.run(`INSERT INTO Jokes (setup, delivery, category_id) VALUES 
        ('Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!', 1),
        ('What kind of tree fits in your hand?', 'A palm tree', 1),
        ('Which bear is the most condescending?', 'Pan-DUH', 2),
        ('What would the Terminator be called in his retirement?', 'The Exterminator', 2)
    `);
});

db.close();
