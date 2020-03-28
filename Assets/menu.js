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
                    "update employee role",
                    "update employee manager",
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
                    "main menu"
                ]
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