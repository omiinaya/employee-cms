//libraries and extensions
const inquirer = require("inquirer");
const cTable = require("console.table");
const menu = require("./Assets/menu.js");
const connection = require("./Assets/db.js");

//definitions and global vars
var currRole;
var currManager;

//functions
function exec() {
    inquirer.prompt(menu.mainMenu).then(function (response) {
        switch (response.mainSelect) {
            case "add":
                choiceAdd();
                break;
            case "view":
                choiceView();
                break;
            case "update":
                choiceUpdate();
                break;
            case "exit":
                process.exit();
        }
    });
}

function choiceAdd() {
    inquirer.prompt(menu.addMenu).then(function (response) {
        switch (response.addSelect) {
            case "add department":
                addDepartmentMenu();
                break;
            case "add role":
                addRoleMenu();
                break;
            case "add employee":
                addEmployeeMenu();
                break;
            case "main menu":
                exec();
                break;
        }
    });
}

function choiceView() {
    inquirer.prompt(menu.viewMenu).then(function (response) {
        switch (response.viewSelect) {
            case "view departments":
                loadDepartments();
                break;
            case "view roles":
                loadRoles();
                break;
            case "view employees":
                sortEmployees();
                break;
            case "main menu":
                exec();
                break;
        }
    });
}

function sortEmployees() {
    inquirer.prompt(menu.viewEmployeesBy).then(function (response) {
        switch (response.employeesBy) {
            case "view all employees":
                loadEmployees();
                break;
            case "view employees by role":
                employeesByRole()
                break;
            case "view employees by manager":
                employeesByManager();
                break;
            case "view employees by department":
                employeesByDepartment();
                break;
            case "main menu":
                exec();
                break;
        }
    });
}

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (response) {
        switch (response.updateSelect) {
            case "main menu":
                exec()
                break;
        }
    });
}

function parseRole(a) {
    if (a == "management") {
        currRole = 1;
    }
    else if (a == "engineering") {
        currRole = 2;
    }
    else if (a == "legal") {
        currRole = 3;
    }
    else if (a == "sales") {
        currRole = 4;
    }
}

function loadDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        console.table(res);
        choiceView();
    });
}

function loadRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        console.table(res);
        choiceView();
    });
}

function loadEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        sortEmployees()
    });
}

function employeesByManager() {
    var managers = [];
    connection.query("SELECT * FROM employee WHERE role_id='1'", function (err, res) {
        var name = [];
        var resCopy = res;
        for (var i = 0; i < res.length; i++) {
            name[i] = res[i].first_name + " " + res[i].last_name;
            managers.push(name[i]);
        }
        inquirer.prompt({
            type: "list",
            name: "managerSelect",
            message: "Please choose employee's manager: ",
            choices: managers
        }).then(function (answer) {
            for (var i = 0; i < resCopy.length; i++) {
                if (name[i] == answer.managerSelect) {
                    currManager = resCopy[i].id;
                    connection.query("SELECT * FROM employee WHERE manager_id='" + currManager + "'", function (err, res) {
                        console.table(res);
                        sortEmployees()
                    });
                }
            }
        });
    });
}

function employeesByRole() {
    var roles = [];
    connection.query("SELECT * FROM role", function (err, res) {
        var resCopy = res;
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
        inquirer.prompt({
            type: "list",
            name: "roleSelect",
            message: "Please choose employee's manager: ",
            choices: roles
        }).then(function (answer) {
            parseRole(answer.roleSelect);
            connection.query("SELECT * FROM employee WHERE role_id='" + currRole + "'", function (err, res) {
                console.table(res);
                sortEmployees()
            });
        });
    });
}

function employeesByDepartment() {
    //
}

function addDepartmentMenu() {
    console.log("placeholder");
    inquirer.prompt(menu.addDepartment).then(function (response) {
        //
    });
}

function addRoleMenu() {
    console.log("placeholder");
    inquirer.prompt(menu.addRole).then(function (response) {
        //
    });
}

function addEmployeeMenu() {
    inquirer.prompt(menu.addEmployee).then(function (answers) {
        parseRole(answers.role);
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: currRole,
                manager_id: answers.managerId
            },
            function (err) {

                if (err) throw err;
                console.log("Your employee was created successfully!");
                choiceAdd();
            }
        );
    });
}

var init = new exec();