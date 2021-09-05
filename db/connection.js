const mysql = require('mysql2');
const startApp = require('../app');

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '12345678',
  database: 'myCompany',
});

// Initialize menu after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

module.exports = db;
