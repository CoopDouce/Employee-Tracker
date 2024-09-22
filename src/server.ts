// Code to start the server and handle the main menu
import express from 'express';
import { connectToDB } from './connection.js';
import { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment,addRole, addEmployee, updateRole, updateManager, employeeByManager, employeeByDepartment, deleteDepartment, deleteEmployee, viewDepartmentBudget, quit } from './services.js';
import inquirer from 'inquirer';

await connectToDB();

// Set up the express app
const PORT = process.env.PORT || 3001;
const app = express();

// Parse incoming JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express());

// Start the server
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete an employee',
                'View the total utilized budget of a department',
                'Quit'
            ]
        }
    ]).then((response) => {
        switch (response.mainMenu) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Update an employee manager':
                updateManager();
                break;
            case 'View employees by manager':
                employeeByManager();
                break;
            case 'View employees by department':
                employeeByDepartment();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'View the total utilized budget of a department':
                viewDepartmentBudget();
                break;
            case 'Quit':
                quit();
                break;
        }
    });
}

// Start the connection
// Gives a designed header and then launches the main menu
const beginConnection = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*        EMPLOYEE TRACKER         *")
    console.log("*                                 *")
    console.log("***********************************")
    mainMenu();
}

beginConnection();

// Listen for requests
app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the mainMenu function
export { mainMenu };