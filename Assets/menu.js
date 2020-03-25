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
                    "add employee"
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
                    "Departments",
                    "Roles",
                    "Employees"
                ]
            }
        ],
}

module.exports = menu;