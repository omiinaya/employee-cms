//libraries
const fs = require("fs");
const inquirer = require("inquirer");
//extensions
const menu = require("./Assets/menu.js");
//functions
function exec() {
    inquirer.prompt(menu.mainMenu).then(function (response) {
        switch (response.mainSelect) {
            case "Add":
                inquirer.prompt(menu.addMenu).then(function (addRes) {
                });
                break;
            case "View":
                inquirer.prompt(menu.viewMenu).then(function (viewRes) {
                });
                break;
            case "Update":
                inquirer.prompt(menu.updateMenu).then(function (updateRes) {
                });
                break;
        }
    });
}

var execute = new exec();