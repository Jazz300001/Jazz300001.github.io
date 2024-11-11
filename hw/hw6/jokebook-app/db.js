const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./jokebook.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the jokebook database.');
  }
});

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
      category_id INTEGER NOT NULL,
      setup TEXT NOT NULL,
      delivery TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES Categories(id)
    )
  `);

  const categories = ['funnyJoke', 'lameJoke'];
  categories.forEach((category) => {
    db.run(
      `INSERT OR IGNORE INTO Categories (name) VALUES (?)`,
      [category],
      (err) => {
        if (err) {
          console.error(`Error inserting category ${category}:`, err.message);
        }
      }
    );
  });

  const jokesData = {
    funnyJoke: [
      {
        setup: 'Why did the student eat his homework?',
        delivery: 'Because the teacher told him it was a piece of cake!',
      },
      {
        setup: 'What kind of tree fits in your hand?',
        delivery: 'A palm tree',
      },
      {
        setup: 'What is worse than raining cats and dogs?',
        delivery: 'Hailing taxis',
      },
    ],
    lameJoke: [
      {
        setup: 'Which bear is the most condescending?',
        delivery: 'Pan-DUH',
      },
      {
        setup: 'What would the Terminator be called in his retirement?',
        delivery: 'The Exterminator',
      },
    ],
  };

  for (const [categoryName, jokes] of Object.entries(jokesData)) {
    db.get(`SELECT id FROM Categories WHERE name = ?`, [categoryName], (err, row) => {
      if (err) {
        console.error(`Error fetching category ${categoryName}:`, err.message);
      } else if (row) {
        const categoryId = row.id;
        jokes.forEach((joke) => {
          db.run(
            `INSERT INTO Jokes (category_id, setup, delivery) VALUES (?, ?, ?)`,
            [categoryId, joke.setup, joke.delivery],
            (err) => {
              if (err) {
                console.error('Error inserting joke:', err.message);
              }
            }
          );
        });
      }
    });
  }
});

module.exports = db;
