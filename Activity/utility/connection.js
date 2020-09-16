var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Captain123@',
    database: 'Instagram_Database'
})
connection.connect();
console.log("Connected to DB");
module.exports = connection;