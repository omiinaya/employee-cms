//libraries and extensions
const fs = require("fs");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const menu = require("./Assets/menu.js");

//query definitions
const queryDepartments = "SELECT * FROM department"
const queryRoles = "SELECT * FROM role";
const queryEmployees = "SELECT * FROM employee";

//db connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "cmsDB"
});
connection.connect(function (err) {
    if (err) throw err;
    exec();
});

//functions
function exec() {
    inquirer.prompt(menu.mainMenu).then(function (response) {
        switch (response.mainSelect) {
            case "Add":
                choiceAdd();
                break;
            case "View":
                choiceView();
                break;
            case "Update":
                choiceUpdate();
                break;
        }
    });
}

function choiceAdd() {
    inquirer.prompt(menu.addMenu).then(function (response) {
        switch (response.addSelect) {
            case "add department":
                //
                break;
            case "add role":
                //
                break;
            case "add employee":
                //
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
        }
    });
}