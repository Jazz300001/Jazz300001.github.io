const db = require('./db');

db.exec(`
    CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        image TEXT
    );
`);

db.prepare(`
    INSERT INTO Products (name, price, description, image) VALUES
    ('Air Zoom BB NXT', 180, 'Performance shoe', 'images/shoe1.jpg'),
    ('KD 14', 150, 'Comfortable basketball shoe', 'images/shoe2.jpg'),
    ('Kyrie Infinity', 130, 'Responsive shoe', 'images/shoe3.jpg');
`).run();
