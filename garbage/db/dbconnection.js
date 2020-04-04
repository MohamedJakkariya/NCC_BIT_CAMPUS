const mysql = require('mysql');

// Import sensitive data from configuration file
const {
  password,
  dbname,
  dbport,
  host
} = require('../../config/config');

// console.log(username + password + dbport + dbname + host);
exports.connection = mysql.createConnection({
  host: host,
  user: 'root',
  password: password,
  database: dbname,
  port: dbport
});
