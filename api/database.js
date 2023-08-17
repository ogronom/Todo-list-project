const sqlite3 = require('sqlite3').verbose();

const DBTASKS = "db.sqlite";

let db = new sqlite3.Database(DBTASKS, (err) => {
  db.run(`DROP TABLE IF EXISTS tasks`);
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text NOT NULL,
            details text,
            status text,
            priority text,
            item_order INTEGER
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          let insert = 'INSERT INTO tasks (title, details, status, priority, item_order) VALUES (?,?,?,?,?)';
          db.run(insert, ["Самолёты","Первым делом - самолёты","new","high",1]);
          db.run(insert, ["Девушки","Ну а девушки потом","new","normal",2]);
          db.run(insert, ["Окрошка на томатном соке с авокадо и креветками","https://lenta.com/recepty/recipes/okroshka-na-tomatnom-soke-s-avokado-i-krevetkami/","new","low",4]);
          db.run(insert, ["Встретиться с друзьями","","done","normal",5]);
        }
      });
    console.log('Created Tasks table.');
  }
});

module.exports = db;
