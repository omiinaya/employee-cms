//experimental

const connection = require("./db.js");
const inquirer = require("inquirer");

initRoles();

function initRoles() {
    var roles=[];
    connection.query("SELECT * FROM role", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
        console.log(roles);
        inquirer.prompt({
            type: "list",
            name: "test",
            message: "choose",
            choices: roles
        })
    });
}