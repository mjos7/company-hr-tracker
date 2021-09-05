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
          'Update Employee Role/Manager', //REQUIRED & //BONUS
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

        // case 'View Employees by Department':
        //   viewEmployeesByDept();
        //   break;

        // case 'View Employees by Manager':
        //   viewEmployeesByMgr();
        //   break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role/Manager':
          updateRole();
          break;

        // case 'Remove Employee':
        //   removeEmployee();
        //   break;

        case 'View Departments':
          viewDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;

        // case 'Remove Department':
        //   removeDepartment();
        //   break;

        case 'View Roles':
          viewRoles();
          break;

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

// View Department
function viewDepartments() {
  const query = 'SELECT * FROM departments';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// View Role
function viewRoles() {
  const query = 'SELECT * FROM roles';
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Update Employee Information

function updateRole() {
  const rolesData = [];
  const rolesNames = [];

  const employeesData = [];
  const employeesNames = [];

  getRolesAsync()
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        rolesData.push(data[i]);
        rolesNames.push(data[i].role);
      }

      getEmployeesAsync()
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            employeesData.push(data[i]);
            employeesNames.push(data[i].last_name);
          }
          updateEmployeeQuestions(
            rolesData,
            rolesNames,
            employeesData,
            employeesNames
          );
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function updateEmployeeQuestions(
  rolesData,
  rolesNames,
  employeesData,
  employeesNames
) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: employeesNames,
        pageSize: 12,
      },
      {
        type: 'list',
        name: 'update',
        message: 'What information would you like to update?',
        choices: [`Employee's role`, `Employee's manager`, 'Cancel'],
      },
    ])
    .then(answers => {
      let employeeId;
      for (let i = 0; i < employeesData.length; i++) {
        if (answers.employee === employeesData[i].last_name) {
          employeeId = employeesData[i].id;
        }
      }
      if (answers.update === `Employee's role`) {
        getNewRoleId(employeeId, rolesData, rolesNames);
      } else if (answers.update === `Employee's manager`) {
        employeesNames.push('No Manager');
        getManagerId(employeeId, employeesData, employeesNames);
      } else {
        startapp();
      }
    });
}

function getNewRoleId(employeeId, rolesData, rolesNames) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: `What is the employee's new role?`,
        choices: rolesNames,
        pageSize: 12,
      },
    ])
    .then(answers => {
      let roleId;
      for (let i = 0; i < rolesData.length; i++) {
        if (answers.role === rolesData[i].role) {
          roleId = rolesData[i].id;
        }
      }
      updateEmployeeRole(employeeId, roleId);
    });
}

function updateEmployeeRole(employeeId, roleId) {
  db.query(
    `UPDATE employees SET ? WHERE ?`,
    [
      {
        role_id: roleId,
      },
      {
        id: employeeId,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`Successfully changed employee's role`);
      startApp();
    }
  );
}

function getManagerId(employeeId, employeesData, employeesNames) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'manager',
        message: `Who is the employee's new manager?`,
        choices: employeesNames,
        pageSize: 12,
      },
    ])
    .then(answers => {
      let managerId;
      for (let i = 0; i < employeesData.length; i++) {
        if (answers.manager === employeesData[i].last_name) {
          managerId = employeesData[i].id;
        }
      }
      if (answers.manager === 'No Manager') {
        managerId = null;
      }
      updateEmployeeManager(employeeId, managerId);
    });
}

function updateEmployeeManager(employeeId, managerId) {
  db.query(
    `UPDATE employees SET ? WHERE ?`,
    [
      {
        manager_id: managerId,
      },
      {
        id: employeeId,
      },
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`Successfully changed employee's manager`);
      startApp();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      message: 'What is the name of the department you want to add?',
      name: 'department',
    })
    .then(function (res) {
      const department = res.department;
      const query = `INSERT INTO departments (name) VALUES("${department}")`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log(`Successfully changed employee's manager`);
        startApp();
      });
    });
}

function getRolesAsync() {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, title AS 'role' FROM roles ORDER BY role`,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}

function getEmployeesAsync() {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, last_name FROM employees ORDER BY last_name`,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}

function getDepartmentsAsync() {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM departments`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

// Function call to start app
startApp();

module.exports = startApp;
