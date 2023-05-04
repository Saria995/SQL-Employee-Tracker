-- Data for names of departents into department table
INSERT INTO department (name) VALUES 
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources'),
  ('Information Technology');


-- Data for roles of employee's that will be placed in the role table
INSERT INTO role (title, salary, department_id) VALUES 
  ('Sales Representative', 50000, 1),
  ('Sales Manager', 80000, 1),
  ('Marketing Specialist', 60000, 2),
  ('Marketing Manager', 90000, 2),
  ('Financial Analyst', 70000, 3),
  ('Chief Financial Officer', 120000, 3),
  ('HR Coordinator', 45000, 4),
  ('HR Manager', 75000, 4),
  ('IT Support Specialist', 55000, 5),
  ('IT Manager', 100000, 5);



-- Data for employee information into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Bob', 'Smith', 3, NULL),
  ('Alice', 'Johnson', 4, 3),
  ('Tom', 'Williams', 5, NULL),
  ('Mike', 'Brown', 6, 5),
  ('Sarah', 'Davis', 7, NULL),
  ('Alex', 'Lee', 8, 7),
  ('Emily', 'Taylor', 9, NULL),
  ('David', 'Clark', 10, 9);