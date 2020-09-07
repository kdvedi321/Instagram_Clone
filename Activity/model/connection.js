var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Captain123@',
    database: 'Instagram_Database'
})
connection.connect();
console.log("connected to db");
module.exports = connection;