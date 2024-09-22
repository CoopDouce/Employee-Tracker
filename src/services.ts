// Purpose: Contains the services that the server will use to interact with the database.
import inquirer from "inquirer";
import { pool } from "./connection.js";
import { QueryResult } from "pg";
import { mainMenu } from "./server.js";

// View all departments
const viewAllDepartments = () => {
    const sqlQuery = `SELECT * FROM department`;
    pool.query(sqlQuery, (err: Error, res: QueryResult) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(res.rows);
        mainMenu();
    })};

// View all roles
const viewAllRoles = () => {
    const sqlQuery = `SELECT * FROM role`;
    pool.query(sqlQuery, (err: Error, res: QueryResult) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(res.rows);
        mainMenu();
    })};

// View all employees
const viewAllEmployees = () => {
    // Query to select all employees and their information
    const sqlQuery = `SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employee e
                LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON e.manager_id = m.id
                ORDER BY ID ASC`;

    pool.query(sqlQuery, (err: Error, res: QueryResult) => {
        // If there is an error, log it to the console
        if (err) {
            console.error(err);
            return;
        }
        console.table(res.rows);
        mainMenu();
    })};

// Add a department
const addDepartment = () => {
    // Prompt the user for the department name
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentInput',
            message: 'Enter the name of the department:'
        }
    ]).then((response) => {
        // Insert the department name into the database
        const sqlQuery = `INSERT INTO department (name) VALUES ($1)`;
        pool.query(sqlQuery, [response.department], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Department added successfully');
            mainMenu();
        });
    })};

// Add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID of the role:'
        }
    ]).then((response) => {
        const sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
        pool.query(sqlQuery, [response.title, response.salary, response.department_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Role added successfully');
            mainMenu();
        });
    })}

// Add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID of the employee:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID of the employee:'
        }
    ]).then((response) => {
        const sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
        pool.query(sqlQuery, [response.first_name, response.last_name, response.role_id, response.manager_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Employee added successfully');
            mainMenu();
        });
    })};

// Update an employee role
const updateRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID of the employee:'
        }
    ]).then((response) => {
        const sqlQuery = `UPDATE employee SET role_id = $1 WHERE id = $2`;
        pool.query(sqlQuery, [response.role_id, response.employee_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Employee role updated successfully');
            mainMenu();
        });
    })};

// Update an employee manager
const updateManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee whose manager you want to update:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the new manager ID of the employee:'
        }
    ]).then((response) => {
        const sqlQuery = `UPDATE employee SET manager_id = $1 WHERE id = $2`;
        pool.query(sqlQuery, [response.manager_id, response.employee_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Employee manager updated successfully');
            mainMenu();
        });
    })};

// View employees by manager 
const employeeByManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the ID of the manager whose employees you want to view:'
        }
    ]).then((response) => {
        const sqlQuery = `SELECT * FROM employee WHERE manager_id = $1`;
        pool.query(sqlQuery, [response.manager_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(res.rows);
            mainMenu();
        });
    })};

// View employees by department
const employeeByDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the ID of the department whose employees you want to view:'
        }
    ]).then((response) => {
        const sqlQuery = `SELECT * FROM employee WHERE department_id = $1`;
        pool.query(sqlQuery, [response.department_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(res.rows);
            mainMenu();
        });
    })};

// Delete a department
const deleteDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the ID of the department you want to delete:'
        }
    ]).then((response) => {
        const sqlQuery = `DELETE FROM department WHERE id = $1`;
        pool.query(sqlQuery, [response.department_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Department deleted successfully');
            mainMenu();
        });
    })};

// Delete an employee
const deleteEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee you want to delete:'
        }
    ]).then((response) => {
        const sqlQuery = `DELETE FROM employee WHERE id = $1`;
        pool.query(sqlQuery, [response.employee_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Employee deleted successfully');
            mainMenu();
        });
    })};

// View the total utilized budget of a department
const viewDepartmentBudget = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the ID of the department whose budget you want to view:'
        }
    ]).then((response) => {
        const sqlQuery = `SELECT SUM(salary) FROM role WHERE department_id = $1`;
        pool.query(sqlQuery, [response.department_id], (err: Error, res: QueryResult) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(res.rows);
            mainMenu();
        });
    })};

// Quit
const quit = () => {
    console.log('Goodbye!');
    pool.end();
    process.exit();
};

export { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateRole, updateManager, employeeByManager, employeeByDepartment, deleteDepartment, deleteEmployee, viewDepartmentBudget, quit };