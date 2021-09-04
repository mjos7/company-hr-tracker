const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

const promptUser = () => {
  return inquirer.prompt(startMenu);
};

// Initialize menu after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

const startMenu = [
  {
    type: 'list',
    name: 'menuSelection',
    message: 'Please select a choice from the menu below.',
    choices: [
      'View Departments',
      'View Roles',
      'View Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee role',
      'Update Employee Managers',
      'View Employees by Manager',
      'View Employees by Department',
      'Delete Department',
      'Delete Role',
      'Delete Employee',
      'View Utilized Budget by Department',
    ],
    validate: menuSelection => {
      if (menuSelection) {
        return true;
      } else {
        console.log('Please select a choice from the options given');
        return false;
      }
    },
  },
];

// Function to initialize app
function init() {
  promptUser();
}

// Function call to initialize app
init();
