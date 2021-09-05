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
          'View Employees', //REQUIRED
          'View Employees by Department', //BONUS
          'View Employees by Manager', //BONUS
          'Add Employee', //REQUIRED
          'Update Employee Role', //REQUIRED
          'Update Employee Manager', //BONUS
          'Remove Employee', //BONUS
          'View Departments', //REQUIRED
          'Add Department', //REQUIRED
          'Remove Department', //BONUS
          'View Roles', //REQUIRED
          'Add Role', //REQUIRED
          'Delete Role', //BONUS
          'View Utilized Budget by Department', //BONUS
          'Exit',
        ],
        validate: menuSelection => {
          if (menuSelection) {
            return true;
          } else {
            console.log('Please select a choice from the options below');
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

        case 'View Employees by Department':
          viewEmployeesByDept();
          break;

        // case 'View Employees by Manager':
        //   viewEmployeesByMgr();
        //   break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateRole();
          break;

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

// NEED HELP
function viewEmployeesByDept() {
  db.query(
    'SELECT employees.first_name, employees.last_name, roles.title AS "role", managers.first_name AS "manager" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY department.name',
    function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);

      startApp();
    }
  );
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName',
      },
      {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName',
      },
      {
        type: 'input',
        message: "What is the employee's role ID?",
        name: 'roleID',
      },
      {
        type: 'input',
        message: "What is the employee's manager ID?",
        name: 'managerID',
      },
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const roleID = res.roleID;
      const managerID = res.managerID;
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log(`${firstName} ${lastName} has been added as an employee`);
        startApp();
      });
    });
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employeeName',
        message: "Which employee's role would you like to update?",
        choices: employees,
      },
      {
        type: 'input',
        name: 'role',
        message: 'What is your new role?',
      },
    ])
    .then(function (res) {
      db.query(
        `UPDATE employees SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
        function (err, res) {
          console.log(res);
          //updateRole(res);
          startApp();
        }
      );
    });
}

// Function call to start app
startApp();

module.exports = startApp;
