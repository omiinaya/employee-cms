//libraries and extensions
const inquirer = require("inquirer");
const cTable = require("console.table");
const menu = require("./Assets/menu.js");
const connection = require("./db.js");

//query definitions
const queryDepartments = "SELECT * FROM department"
const queryRoles = "SELECT * FROM role";
const queryEmployees = "SELECT * FROM employee";

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
                addDepartmentMenu()
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
                loadDB(queryDepartments);
                break;
            case "view roles":
                loadDB(queryRoles);
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

function loadDB(query) {
    console.log("-------------------------------------------------");
    connection.query(query, function (err, res) {
        console.table(res);
        choiceView();
    });
}

function sortEmployees() {
    inquirer.prompt(menu.viewEmployeesBy).then(function (response) {
        switch (response.employeesBy) {
            case "view all employees":
                loadDB(queryEmployees);
                break;
            case "view employees by role":
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
        connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
            },
            function(err) {
              if (err) throw err;
              console.log("Your auction was created successfully!");
              // re-prompt the user for if they want to bid or post
              start();
            }
          );
    });
}

var init = new exec();