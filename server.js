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

        }
    })
}
