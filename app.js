const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

// Start app
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menuSelection',
        message: 'Please select a choice from the menu below.',
        choices: [
          'View Employees',
          'View Employees by Department',
          'View Employees by Manager',
          'Add Employee',
          'Update Employee Role',
          'Update Employee Manager',
          'Remove Employee',
          'View Departments',
          'Add Department',
          'Remove Department',
          'View Roles',
          'Add Role',
          'Delete Role',
          'View Utilized Budget by Department',
          'Exit',
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
    ])
    // Call function based on menu selection
    .then(function ({ menuSelection }) {
      switch (menuSelection) {
        case 'View Employees':
          viewEmployees();
          break;

        // case 'View Employees by Department':
        //   viewEmployeesByDept();
        //   break;

        // case 'View Employees by Manager':
        //   viewEmployeesByMgr();
        //   break;

        // case 'Add Employee':
        //   addEmployee();
        //   break;

        // case 'Update Employee Role':
        //   updateRole();
        //   break;

        // case 'Update Employee Manager':
        //   updateEmpMgr();
        //   break;

        // case 'Remove Employee':
        //   removeEmployee();
        //   break;

        // case 'View Departments':
        //   viewDepartments();
        //   break;

        // case 'Add Department':
        //   addDepartment();
        //   break;

        // case 'Remove Department':
        //   removeDepartment();
        //   break;

        // case 'View Roles':
        //   viewRoles();
        //   break;

        // case 'Add Roles':
        //   addRoles();
        //   break;

        // case 'Remove Role':
        //   deleteRole();
        //   break;

        // case 'View Utilized Budget by Department':
        //   viewUtilizedBudget();
        //   break;

        case 'Exit':
          db.end();
          break;
      }
    });
}

function viewEmployees() {
  db.query(
    'SELECT employees.first_name, employees.last_name, roles.title AS "role", managers.first_name AS "manager" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id',
    function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);

      startApp();
    }
  );
}

// Function call to start app
startApp();

module.exports = startApp;
