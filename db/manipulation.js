const path = require('path');
const {tableName} = require('../config/config');

// To store folder root path name
const rootPath = path.dirname(require.main.filename);

exports.read = async (sql, email) => {
  try{ 
    await sql.connection.query(
      `SELECT * FROM ${tableName} WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return 0;
        }
  
        console.log(results);
        
        const foundemail = results[0].email;
        const foundpassword = results[0].password;
        console.log('found user ' + foundemail + ' and pass is ' + foundpassword);
        return results;
      }
    );
  }catch{
    console.log('Error while read from db');
  }
  
};

exports.write = (sql, post, res) => {
  const tableName = 'studentLogin';

  sql.connection.query(`INSERT INTO ${tableName} SET ?`, post, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;

    // Print it
    console.log('Successfully write -> ' + results[0]);

    // Send response to the client
    res.sendFile(rootPath + '/public/pagelinks/success.html');
  });
};
