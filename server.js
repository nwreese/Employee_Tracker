const mysql = require('mysql');
const inquirer = require('inquirer');
const app = require('express')()
require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'employee_tracker_DB',
});

const promptUser = () =>
inquirer.prompt([
    { type: 'list',
    message: 'What would you like to do?',
choices: [
    'View Departments', 
    'Manage Departments', 
    'View Roles', 
    'Manage Roles', 
    'View Employees', 
    'Manage Employees',
    'End'], 
name: 'initalPrompt'
}
])
.then((answer) => {
    switch (answer.initalPrompt) {
        case 'View Departments':
            viewDepartments();
            break;
        case 'Manage Departments':
            managageDepartments();
            break
        case 'View Roles':
            viewRoles();
            break;
        case 'Manage Roles':
            manageRoles();
            break;
        case 'View Employees':
            viewEmployees();
            break;
        case 'Manage Employees':
            manageEmployees();
            break
        case 'End':
            endConnection();
            break
    }
})
 
const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) =>{
        if (err) throw (err);
        console.table(res);
        promptUser();
    });
 };

const managageDepartments = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add department',
                'Remove department'
            ],
            name: 'deptQuestion',

        },
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'newDeptName',
            when: (answer) => {
              return answer.deptQuestion === 'Add department';

            }
            
        },
        {
            type: 'input',
            message: 'What is the depratment ID you would like to remove?',
            name: 'removeDeptID',
            when: (answer) => {
              return answer.deptQuestion === 'Remove department';
            }
        }
    ])
    .then((answer) => {
   switch(answer.deptQuestion) {
            case 'Add department':
                connection.query(
                    'INSERT INTO department SET name=?',
                    [answer.newDeptName],
                    (err, res) => {
                        if (err) throw err;
                        console.log('Department added');
                        promptUser();
                    })
                break;
            case 'Remove department':
                 connection.query(
                    'DELETE FROM department WHERE id=?',
                    [answer.removeDeptID],
                    (err, res) => {
                        if (err) throw err;
                        console.log('Department removed');
                        promptUser();
                    }
                )
                break;
        }
    })
};



 const viewRoles = () => {
     connection.query('SELECT * FROM roles', (err, res) =>{
         if (err) throw(err);
         console.log(res);
     });
    };

    const manageRoles = () => {

    }
   
   
    const viewEmployees = () => {
        connection.query('SELECT * FROM employees', (err, res) =>{
            if (err) throw (err);
            console.log(res);
        })
    }

    const manageEmployees = () => {

    }
promptUser();
const endConnection = () => {
    connection.end();
}
