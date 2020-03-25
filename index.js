//libraries
const fs = require("fs");
const mysql = require("mysql");
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
    inquirer.prompt(menu.viewMenu).then(function (viewRes) {
        switch (response.viewSelect) {
            case "view departments":
                //
                break;
            case "view roles":
                //
                break;
            case "view employees":
                //
                break;
        }         
    });
}

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (updateRes) {
    //
    });
}

function viewDepartments() {

}

var execute = new exec();