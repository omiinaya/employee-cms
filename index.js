//libraries
const fs = require("fs");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
//extensions
const menu = require("./Assets/menu.js");
//db connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "cmsDB"
});
//exec start
connection.connect(function (err) {
    if (err) throw err;
    exec();
});
//definitions
const queryDepartments = "SELECT * FROM department"
const queryRoles = "SELECT * FROM role";
const queryEmployees = "SELECT * FROM employee";
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
                loadDB(queryEmployees);
                break;
            case "main menu":
                exec();
                break;
        }
    });
}

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (response) {
    });
}

function loadDB(a) {
    console.log("-----------------------------------");
    connection.query(a, function (err, res) {
        console.table(res);
        choiceView();
    });
}