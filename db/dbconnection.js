const mysql = require('mysql');

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mdjack9524369244',
  database: 'ncc',
  port: '3000'
});
