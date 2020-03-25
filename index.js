//libraries
const fs = require("fs");
const inquirer = require("inquirer");
//extensions
const menu = require("./Assets/menu.js");
//
//
//
inquirer.prompt(menu.mainMenu).then(function (data) {
    switch (data.main) {
        case "Add":
            console.log("add");
        break;
        case "View":
            console.log("view");
        break;
        case "Update":
            console.log("update");
        break;
    }
});
