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
    inquirer.prompt(menu.addMenu).then(function (addRes) {
    });
}

function choiceView() {
    inquirer.prompt(menu.viewMenu).then(function (viewRes) {             
    });
}

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (updateRes) {
    });
}

var execute = new exec();