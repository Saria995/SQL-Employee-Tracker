// Variable dependencies/Packages
const inquirer = require('inquirer');
const db = require('./db/connection');

//Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database Connected successfully');
    employee_tracker();
});

// Function to start the application
let employee_tracker = function () {
    inquirer.prompt({
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then((answers) => {
        //View the Department table in the database
        if (answers.prompt === 'View all departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.log(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View all roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all roles: ");
                console.log(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View all employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all employees: ");
                console.log(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Adda department') {
            inquirer.prompt([{
                //Adding a department
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please add a department!');
                    } return false;
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add a role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        //Add a role prompt
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            }else {
                                console.log('No Role added, Please add a role');
                                return false;
                            }
                        }
                    },
                    {
                        //Add salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            }else {
                                console.log('Please add a Salary');
                                return false;
                            }
                        }
                    },
                    {
                        //Adding Department
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                        
                    }
                ]).then((answers) => {
                    for (var i= 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                    });
                })
            });

        } else if (answers.prompt === 'Add an employee') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        //adding employee last name
                        type: 'input',
                        name: 'lastname',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            }else {
                                console.log('Please add a salary');
                                return false;
                            }
                        }
                    },
                    {
                        //Adding employee role
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [... new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        //Add employee manager
                        type: 'input',
                        name: 'manager',
                        message: 'Name of the employees manager',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Please enter a managers name');
                                return false;
                            }
                        }
    
                    }
                ]).then((answers) => {
                    for (var i = 0; i <result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Update an employee role') {
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee role do you want to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [... new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        //Update new role
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [... new Set(array)];
                            return newArray;
                        }
                    }
                ]).then ((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("GoodBye!");
        }
    })
};
