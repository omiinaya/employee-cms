const connection = require("./db.js");

const menu = {
    mainMenu:
        [
            {
                type: "list",
                name: "mainSelect",
                message: "What would you like to do?",
                choices: [
                    "add",
                    "remove",
                    "view",
                    "update",
                    "exit"
                ]
            }
        ],
    addMenu:
        [
            {
                type: "list",
                name: "addSelect",
                message: "What would you like to add?",
                choices: [
                    "add department",
                    "add role",
                    "add employee",
                    "main menu"
                ]
            }
        ],
    removeMenu:
        [
            {
                type: "list",
                name: "removeSelect",
                message: "What would you like to remove?",
                choices: [
                    "remove department",
                    "remove role",
                    "remove employee",
                    "main menu"
                ]
            }
        ],
    viewMenu:
        [
            {
                type: "list",
                name: "viewSelect",
                message: "What would you like to view?",
                choices: [
                    "view departments",
                    "view roles",
                    "view employees",
                    "main menu"
                ]
            }
        ],
    updateMenu:
        [
            {
                type: "list",
                name: "updateSelect",
                message: "What would you like to update?",
                choices: [
                    "departments",
                    "roles",
                    "employees",
                    "main menu"
                ]
            }
        ],
    viewEmployeesBy:
        [
            {
                type: "list",
                name: "employeesBy",
                message: "Sort employees by: ",
                choices: [
                    "view all employees",
                    "view employees by role",
                    "view employees by manager",
                    "view employees by department",
                    "main menu"
                ]
            }
        ],
    employeesByManager:
        [
            {
                type: "input",
                name: "managerId",
                message: "Please enter manager id: "
            }
        ],
    employeesByRole:
        [

            {
                type: "list",
                name: "roleId",
                message: "Please choose role to filter by: ",
                choices: [
                    "management",
                    "engineering",
                    "legal",
                    "sales"
                ]
            }

        ],
    employeesByDept:
        [

            {
                type: "input",
                name: "departmentId",
                message: "Please enter department id: "
            }

        ],
    addEmployee:
        [
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the employee?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of the employee?",
            },
            {
                type: "list",
                name: "role",
                message: "Select the employee's role: ",
                choices: [
                    "management",
                    "engineering",
                    "legal",
                    "sales"
                ]
            },
            {
                type: "input",
                name: "managerId",
                message: "Please enter the employee manager's ID: ",
            }
        ],
    addRole: [
        {
            type: "input",
            name: "roleTitle",
            message: "What is the role's name?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the role's salary?"
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "What is the role's department id?"
        }
    ],
    addDepartment: [
        {
            type: "input",
            name: "departmentName",
            message: "What is the deparment's name?"
        }
    ]
}

module.exports = menu;