//libraries and extensions
const inquirer = require("inquirer");
const cTable = require("console.table");
const menu = require("./Assets/menu.js");
const connection = require("./Assets/db.js");

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

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (response) {
        switch (response.updateSelect) {
            case "main menu":
                exec()
                break;
        }
    });
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
        choiceView();
    });
}

function employeesByManager() {
    inquirer.prompt(
        {
            type: "input",
            name: "managerId",
            message: "Please enter manager ID: "
        }
    ).then(function (data) {
        connection.query("SELECT * FROM employee WHERE manager_id='"+data.managerId+"'", function (err, res) {
            console.table(res);
            choiceView();
        });
    });
}

function sortEmployees() {
    inquirer.prompt(menu.viewEmployeesBy).then(function (response) {
        switch (response.employeesBy) {
            case "view all employees":
                loadEmployees();
                break;
            case "view employees by role":
                break;
            case "view employees by manager":
                employeesByManager();
                break;
        }
    });
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
        var currRole;
        if (answers.role === "management") {
            currRole = 1;
        }
        else if (answers.role === "engineering") {
            currRole = 2;
        }
        else if (answers.role === "legal") {
            currRole = 3;
        }
        else if (answers.role === "sales") {
            currRole = 4;
        }
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
                console.log("Your auction was created successfully!");
                choiceAdd();
            }
        );
    });
}

var init = new exec();