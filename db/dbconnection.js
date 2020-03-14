const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mdjack9524369244',
  database: 'ncc',
  port: '3000'
});

const connection = con.connect(function(err) {
  if (err) throw err;
  console.log('MySql Connected!');
});

exports.connection = connection;
