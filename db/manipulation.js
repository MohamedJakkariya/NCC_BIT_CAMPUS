const path = require('path');
const { tableName } = require('../config/config');

// To store folder root path name
// const rootPath = path.dirname(require.main.filename);

exports.read = async (sql, email) => {
  try {
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
        console.log(
          'found user ' + foundemail + ' and pass is ' + foundpassword
        );
        return results;
      }
    );
  } catch {
    console.log('Error while read from db');
  }

  // For check validation
  // sql.connection.query(
  //   `SELECT * FROM ${tableName} WHERE email = ${email}`,
  //   function(err, rows) {
  //     if (err) return done(err);
  //     if (!rows.length) {
  //       return done(
  //         null,
  //         false,
  //         req.flash('loginMessage', 'No user found.')
  //       ); // req.flash is the way to set flashdata using connect-flash
  //     }

  //     // if the user is found but the password is wrong
  //     if (!(rows[0].password == password))
  //       return done(
  //         null,
  //         false,
  //         req.flash('loginMessage', 'Oops! Wrong password.')
  //       ); // create the loginMessage and save it to session as flashdata

  //     // all is well, return successful user
  //     return done(null, rows[0]);
  //   }
  // );
};

exports.write = (sql, post,req, res) => {
  sql.connection.query(
    `select * from ${tableName} where email = "${post.email}"`,
    function(err, rows) {
      console.log(rows);
      console.log('above row object');
      if (err) throw err;
      if (rows.length) {
        res.render('errorsignup', {who: 'Student',actionRoute: '/student/signup',errormsg : "Email Aldready Exit!"})
      } else {
        // if there is no user with that email
        // create the user
        sql.connection.query(`INSERT INTO ${tableName} SET ?`, post, function(
          error,
          results,
          fields
        ) {
          if (error) throw error;

          // Print it
          console.log('Successfully write -> ' + results);
          req.login(post, (err) => {
            res.redirect('/student/profile');
          });
        });
      }
    }
  );
};
