const mysql = require('mysql');
const config = require('./config')
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.port
});

connection.connect(error => {
    if(error) {
        console.log('error to connect database');
        return error;
    }
    else {
        console.log('database ok')
    }
});

module.exports = connection;