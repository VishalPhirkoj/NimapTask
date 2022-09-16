const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin123",
  database: "testdb",
  charset: "utf8mb4",
});

db.connect((err) => {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }
  console.log(`Database connected to ${db.config.database}`);
});

module.exports = db;
