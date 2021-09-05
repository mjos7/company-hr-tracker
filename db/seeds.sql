USE myCompany;

INSERT INTO departments (name)
VALUES ("Sales");
INSERT INTO departments (name)
VALUES ("Marketing");
INSERT INTO departments (name)
VALUES ("Product");
INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Customer Success");
INSERT INTO departments (name)
VALUES ("Customer Support");
INSERT INTO departments (name)
VALUES ("Finance");
INSERT INTO departments (name)
VALUES ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("VP Sales", 150000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Account Executive", 80000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Manager", 80000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Marekting Coordinator", 60000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("VP Marketing", 150000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("VP Product", 150000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Product Manager", 100000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 160000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("VP Engineering", 200000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("VP Customer Experience", 120000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Success Manager", 60000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Support Rep", 50000, 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("CFO", 180000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Controller", 120000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 80000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Council", 200000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Conor", "McGreggor", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Christiano", "Ronaldo", 2, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Lebron", "James", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Durant", 4, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Klay", "Thompson", 5, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Stephen", "Curry", 6, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Lewis", "Hamilton", 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Serena", "Williams", 8, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Harden", 9, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kyrie", "Irving", 10,4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Naomi", "Osaka", 11, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Serena", "Williams", 12, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Oprah", "Winfrey", 13, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jennifer", "Aniston", 14, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Selena", "Gomez", 15, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Denzel", "Washington", 16, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("George", "Clooney", 17, null);
