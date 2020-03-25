//libraries
const fs = require("fs");
const mysql = require("mysql");
const inquirer = require("inquirer");
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

connection.connect(function(err) {
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
                loadEmployees();
                break;
            case "main menu":
                exec();
                break;
        }         
    });
}

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (response) {
    //
    });
}

function loadDepartments() {
    console.log("-----------------------------------");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].name);
      }
      console.log("-----------------------------------");
      choiceView();
    });
  }

function loadRoles() {
    console.log("-----------------------------------");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
      }
      console.log("-----------------------------------");
      choiceView();
    });
}

function loadEmployees() {
    console.log("-----------------------------------");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
      }
      console.log("-----------------------------------");
      choiceView();
    });
}