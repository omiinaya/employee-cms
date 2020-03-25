const menu = {
    mainMenu:
        [
            {
                type: "list",
                name: "mainSelect",
                message: "What would you like to do?",
                choices: [
                    "Add",
                    "View",
                    "Update"
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
}

module.exports = menu;