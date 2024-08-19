const inquirer = require('inquirer');
const { client } = require('./work_db');

const displayMainMenu = async () => {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'Add Employee',
            'View All Employees',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit'
        ]
    });

    switch (answer.action) {
        case 'Add Employee':
            await addEmployee();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Exit':
            await exit();
            return; 
        default:
            console.log('Invalid option selected.');
            break;
    }

    displayMainMenu();
};

const viewAllEmployees = async () => {
    try {
        const res = await client.query('SELECT * FROM employee');
        console.table(res.rows);
    } catch (err) {
        console.error('Error retrieving employees:', err);
    }
};

const viewAllRoles = async () => {
    try {
        const res = await client.query('SELECT * FROM role');
        console.table(res.rows);
    } catch (err) {
        console.error('Error retrieving roles:', err);
    }
};

const viewAllDepartments = async () => {
    try {
        const res = await client.query('SELECT * FROM department');
        console.table(res.rows);
    } catch (err) {
        console.error('Error retrieving departments:', err);
    }
};

// Placeholder functions
const addEmployee = async () => {
    console.log('Add Employee functionality goes here.');
};

const addRole = async () => {
    console.log('Add Role functionality goes here.');
};

const addDepartment = async () => {
    console.log('Add Department functionality goes here.');
};

const updateEmployeeRole = async () => {
    console.log('Update Employee Role functionality goes here.');
};

const exit = async () => {
    try {
        await client.end();
        console.log("Connection closed");
    } catch (err) {
        console.error('Error closing the connection:', err);
    }
    console.log("Goodbye!");
};

displayMainMenu();