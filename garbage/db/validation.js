const sql = require('./dbconnection');
const bcrypt = require('bcrypt');

exports.checkUser = async (email, password, res) => {
  try {
    const tableName = 'studentLogin';
    const field = 'email';
  
     await sql.connection.query(
      `SELECT * FROM ${tableName} WHERE ${field} = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
            res.render('errorsignin', { actionRoute: '/student/signin', who: 'Student' });
        }
  
        console.log(results);
        
        // console.log('found user ' + foundemail + ' and pass is ' + foundpassword);
        user = results;

        console.log('Check user fn ' + user);
      }

    );
    
    if (await bcrypt.compare(password, user[0].password)) {
        // Here we send all the data to client from fetch the db 
    res.render('profile');
    } else {
        res.render('errorsignin', { actionRoute: '/student/signin', who: 'Student' });
    }
  } catch {
    res.render('errorsignin', { actionRoute: '/student/signin', who: 'Student' });
}
};
