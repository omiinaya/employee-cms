const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "cmsDB"
});
connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;