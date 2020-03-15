const path = require('path');

// To store folder root path name
const rootPath = path.dirname(require.main.filename);

exports.read = (sql, email, res) => {
  const tableName = 'studentLogin';
  const field = 'email';

  sql.connection.query(
    `SELECT * FROM ${tableName} WHERE ${field} = ?`,
    [email],
    (error, results, fields) => {
      if (error) throw error;

      console.log(results[0].firstName + results[0].secondname);
      res.sendFile(rootPath + '/public/pagelinks/success.html');
    }
  );
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
    console.log('Successfully write -> ' + fields);

    // Send response to the client
    res.sendFile(rootPath + '/public/pagelinks/success.html');
  });
};
