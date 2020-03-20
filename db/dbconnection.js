const mysql = require('mysql');
const {username, password, dbname, dbport, host} = require('../config/config');

exports.connection = mysql.createConnection({
  host: host,
  user: username,
  password: password,
  database: dbname,
  port: dbport
});
