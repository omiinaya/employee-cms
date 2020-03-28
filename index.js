//libraries and extensions
const inquirer = require("inquirer");
const cTable = require("console.table");
const menu = require("./Assets/menu.js");
const connection = require("./Assets/db.js");

//definitions and global vars
var currDepartment;
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
                removeDepartment();
                break;
            case "remove role":
                removeRole();
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

function choiceUpdate() {
    inquirer.prompt(menu.updateMenu).then(function (response) {
        switch (response.updateSelect) {
            case "update employee role":
                updateEmployeeRole()
                break;
            case "update employee manager":
                //
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
            case "main menu":
                exec();
                break;
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
                    console.log("currManager:" + currManager);
                    var query = "SELECT * FROM employee WHERE manager_id='" + currManager + "'";
                    console.log(query);
                    connection.query(query, function (err, res) {
                        console.table(res);
                        sortEmployees()
                    });
                    break;
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
            connection.query("SELECT * FROM role", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].title == answer.roleSelect) {
                        currRole = res[i].id;
                        connection.query("SELECT * FROM employee WHERE role_id='" + currRole + "'", function (err, res) {
                            console.table(res);
                            sortEmployees()
                        });
                        break;
                    }
                }
            });
        });
    });
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
                    message: "Who is the employee's manager?",
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
                    connection.query("DELETE FROM employee WHERE id='" + currEmployee + "'", function (err) {

                        if (err) throw err;
                        console.log("Your employee was deleted successfully!");
                        choiceRemove()
                    });
                }
            }
        });
    });
}

function removeDepartment() {
    var departments = [];
    connection.query("SELECT * FROM department", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].name);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "selectDepartment",
                message: "What department would you like to remove?",
                choices: departments
            }
        ]).then(function (res) {
            currDepartment = res.selectDepartment;
            connection.query("DELETE FROM department WHERE name='" + currDepartment + "'", function (err) {
                if (err) throw err;
                console.log("Your department was deleted successfully!");
                choiceRemove()
            });
        });
    });
}

function removeRole() {
    var roles = [];
    connection.query("SELECT * FROM role", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "selectRole",
                message: "What role would you like to remove?",
                choices: roles
            }
        ]).then(function (res) {
            currRole = res.selectRole;
            connection.query("DELETE FROM role WHERE title='" + currRole + "'", function (err) {
                if (err) throw err;
                console.log("Your role was deleted successfully!");
                choiceRemove()
            });
        });
    });
}

function updateEmployeeRole() {
    var roles = [];
    connection.query("SELECT * FROM role", function (err, response) {
        for (var i = 0; i < response.length; i++) {
            roles.push(response[i].title);
        }
        var employees = [];
        var name = [];
        connection.query("SELECT * FROM employee", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                name[i] = res[i].first_name + " " + res[i].last_name;
                employees.push(name[i]);
            }
            inquirer.prompt({
                type: "list",
                name: "employeeSelect",
                message: "What employee would you like to update the role of?",
                choices: employees

            }).then(function (answer) {
                for (var i = 0; i < res.length; i++) {
                    if (name[i] == answer.employeeSelect) {
                        currEmployee = res[i].id;
                        inquirer.prompt({
                            type: "list",
                            name: "newRole",
                            message: "What would you like the new role of the employee to be?",
                            choices: roles
                        }).then(function (data) {
                            for (var i = 0; i < response.length; i++) {
                                if (response[i].title == data.newRole) {
                                    currRole = response[i].id;
                                    connection.query("UPDATE employee SET role_id ='" + currRole + "' WHERE id ='" + currEmployee + "'", function (err, res) {
                                        if (err) throw err;
                                        console.log("Your employee's role was updated successfully!");
                                        choiceUpdate()
                                    });
                                }
                            }
                        });
                        break;
                    }
                }
            });
        });

    });
}

var init = new exec();