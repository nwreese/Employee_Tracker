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
     connection.query('SELECT * FROM role', (err, res) =>{
         if (err) throw(err);
         console.log(res);
         promptUser();
     });
    };

    const manageRoles = () => {
        inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'Add role',
                    'Remove role'
                ],
                name: 'roleQuestion',
    
            },
            {
                type: 'input',
                message: 'What is the name of the new role?',
                name: 'newRoleName',
                when: (answer) => {
                  return answer.roleQuestion === 'Add role';
    
                }
                
            },
            {
                type: 'input',
                message: 'What is the role ID you would like to remove?',
                name: 'removeRoleID',
                when: (answer) => {
                  return answer.roleQuestion === 'Remove role';
                }
            }
        ])
        .then((answer) => {
       switch(answer.roleQuestion) {
                case 'Add role':
                    connection.query(
                        'INSERT INTO role SET title=?',
                        [answer.newRoleName],
                        (err, res) => {
                            if (err) throw err;
                            console.log('Role added');
                            promptUser();
                        })
                    break;
                case 'Remove role':
                     connection.query(
                        'DELETE FROM role WHERE id=?',
                        [answer.removeRoleID],
                        (err, res) => {
                            if (err) throw err;
                            console.log('Role removed');
                            promptUser();
                        }
                    )
                    break;
            }
        })
    };
    
   
   
    const viewEmployees = () => {
        connection.query('SELECT * FROM employees', (err, res) =>{
            if (err) throw (err);
            console.log(res);
            promptUser();
        })
    }

    const manageEmployees = () => {

    }
promptUser();
const endConnection = () => {
    connection.end();
}
