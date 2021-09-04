const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt(menu);
};

const menu = [
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
