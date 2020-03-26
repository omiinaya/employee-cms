//libraries and extensions
const inquirer = require("inquirer");
const cTable = require("console.table");
const menu = require("./Assets/menu.js");
const connection = require("./Assets/db.js");

//definitions and global vars
var currRole;
var currManager;
var currEmployee;

//functions
function exec() {
    inquirer.prompt(menu.mainMenu).then(function (response) {
        switch (response.mainSelect) {
            case "add":
                choiceAdd();
                break;
            case "remove":
                choiceRemove();
                break;
            case "view":
                choiceView();
                break;
            case "update":
                choiceUpdate();
                break;
            case "exit":
                process.exit();
        }
    });
}

function choiceAdd() {
    inquirer.prompt(menu.addMenu).then(function (response) {
        switch (response.addSelect) {
            case "add department":
                addDepartment();
                break;
            case "add role":
                addRole();
                break;
            case "add employee":
                addEmployee();
                break;
            case "main menu":
                exec();
                break;
        }
    });
}

function choiceRemove() {
    inquirer.prompt(menu.removeMenu).then(function (response) {
        switch (response.removeSelect) {
            case "remove department":
                //
                break;
            case "remove role":
                //
                break;
            case "remove employee":
                removeEmployee();
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

function sortEmployees() {
    inquirer.prompt(menu.viewEmployeesBy).then(function (response) {
        switch (response.employeesBy) {
            case "view all employees":
                loadEmployees();
                break;
            case "view employees by role":
                employeesByRole()
                break;
            case "view employees by manager":
                employeesByManager();
                break;
            case "view employees by department":
                employeesByDepartment();
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

function parseRole2(a) {
    if (a == "management") {
        currRole = 1;
    }
    else if (a == "engineering") {
        currRole = 2;
    }
    else if (a == "legal") {
        currRole = 3;
    }
    else if (a == "sales") {
        currRole = 4;
    }
}

function parseRole(a) {
    console.log("value of a: " + a);
    connection.query("SELECT * FROM role", function (err, res) {
        //console.log(res[0].title);
        for (var i = 0; i < res.length; i++) {
            //console.log(res[i].title);
            if (res[i].title == a) {
                //console.log("test");
                currRole = res[i].id;
                console.log(currRole);
            }
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
        sortEmployees()
    });
}

function employeesByManager() {
    var managers = [];
    connection.query("SELECT * FROM employee WHERE role_id='1'", function (err, res) {
        var name = [];
        var resCopy = res;
        for (var i = 0; i < res.length; i++) {
            name[i] = res[i].first_name + " " + res[i].last_name;
            managers.push(name[i]);
        }
        inquirer.prompt({
            type: "list",
            name: "managerSelect",
            message: "Please choose employee's manager: ",
            choices: managers
        }).then(function (answer) {
            for (var i = 0; i < resCopy.length; i++) {
                if (name[i] == answer.managerSelect) {
                    currManager = resCopy[i].id;
                    connection.query("SELECT * FROM employee WHERE manager_id='" + currManager + "'", function (err, res) {
                        console.table(res);
                        sortEmployees()
                    });
                }
            }
        });
    });
}

function employeesByRole() {
    var roles = [];
    connection.query("SELECT * FROM role", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
        inquirer.prompt({
            type: "list",
            name: "roleSelect",
            message: "Please choose employee's manager: ",
            choices: roles
        }).then(function (answer) {
            parseRole(answer.roleSelect);
            connection.query("SELECT * FROM employee WHERE role_id='" + currRole + "'", function (err, res) {
                console.table(res);
                sortEmployees()
            });
        });
    });
}

function employeesByDepartment() {
    //
}

function addDepartment() {
    inquirer.prompt(menu.addDepartment).then(function (res) {
        connection.query("INSERT INTO department SET ?",
            {
                name: res.departmentName,
            },
            function (err) {

                if (err) throw err;
                console.log("Your department was created successfully!");
                choiceAdd();
            }
        );
    });
}

function addRole() {
    inquirer.prompt(menu.addRole).then(function (res) {
        connection.query("INSERT INTO role SET ?",
            {
                title: res.roleTitle,
                salary: res.roleSalary,
                department_id: res.roleDepartment,
            },
            function (err) {

                if (err) throw err;
                console.log("Your role was created successfully!");
                choiceAdd();
            }
        );
    });
}

function addEmployee() {
    var roles = [];
    var managers = [];
    connection.query("SELECT * FROM role", function (err, roleRes) {
        for (var i = 0; i < roleRes.length; i++) {
            roles.push(roleRes[i].title);
        }
        connection.query("SELECT * FROM employee WHERE role_id='1'", function (err, res) {
            var name = [];
            var resCopy = res;
            for (var i = 0; i < res.length; i++) {
                name[i] = res[i].first_name + " " + res[i].last_name;
                managers.push(name[i]);
            }
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the first name of the employee?",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the last name of the employee?",
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: roles
                },
                {
                    type: "list",
                    name: "managerSelect",
                    message: "Please choose employee's manager: ",
                    choices: managers
                }
            ]).then(function (answer) {
                for (var i = 0; i < resCopy.length; i++) {
                    if (name[i] == answer.managerSelect) {
                        currManager = resCopy[i].id;
                        connection.query("SELECT * FROM role", function (err, res) {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].title == answer.role) {
                                    currRole = res[i].id;
                                    connection.query("INSERT INTO employee SET ?",
                                        {
                                            first_name: answer.firstName,
                                            last_name: answer.lastName,
                                            role_id: currRole,
                                            manager_id: currManager
                                        },
                                        function (err) {

                                            if (err) throw err;
                                            console.log("Your employee was created successfully!");
                                            choiceAdd();
                                        }
                                    );
                                }
                            }
                        });
                    }
                }
            });
        });
    });
}

function removeEmployee() {
    var employees = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        var name = [];
        var resCopy = res;
        for (var i = 0; i < res.length; i++) {
            name[i] = res[i].first_name + " " + res[i].last_name;
            employees.push(name[i]);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "employeeSelect",
                message: "What employee would you like to remove? ",
                choices: employees
            }
        ]).then(function (answer) {
            for (var i = 0; i < resCopy.length; i++) {
                if (name[i] == answer.employeeSelect) {
                    currEmployee = resCopy[i].id;
                    console.log(currEmployee);
                    connection.query("DELETE FROM employee WHERE id='" + currEmployee + "'", function (err) {

                        if (err) throw err;
                        console.log("Your employee was deleted successfully!");
                        choiceAdd();
                    });
                }
            }
        });
    });
}

var init = new exec();