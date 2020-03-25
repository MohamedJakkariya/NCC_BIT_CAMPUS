const { loginTable } = require('../config/config');
const bcrypt = require('bcrypt');

exports.read = (sql, email, password, res) => {
  // For check validation
  sql.connection.query(
    `SELECT * FROM ${loginTable} WHERE email = "${email}"`,
    function(err, rows) {
      if (err) {
        res.render('errorsignin', {
          who: 'Student',
          actionRoute: '/student/signin',
          errormsg: 'Something went wrong!'
        });
      }
      console.log(rows.length);

      if (rows.length) {
        // if the user is found but the password is wrong
        bcrypt.compare(password, rows[0].password).then(function(result) {
          if (result) {
            // all is well, return successful user
            // for admin
            if(rows[0].type == 'admin'){
              res.render('dashboard');
            }else{
              // for student
              res.render('profile');
            }
          } else {

            // for admin
            if(rows[0].type == 'admin'){
              res.render('errorsignin', {
                who: 'Admin',
                actionRoute: '/admin/signin',
                errormsg: 'Incorrect Password!'
              });
            }else{
              // for student
              res.render('errorsignin', {
                who: 'Student',
                actionRoute: '/student/signin',
                errormsg: 'Incorrect Password!'
              });
            }
          }
        });
      } else {
        res.render('errorsignin', {
          who: '',
          actionRoute: '/student/signin',
          errormsg: "User doen't exit!"
        });
      }
    }
  );
};

exports.write = (sql, post, req, res) => {
  sql.connection.query(
    `select * from ${loginTable} where email = "${post.email}"`,
    function(err, rows) {
      console.log(rows);
      console.log('above row object');
      if (err) throw err;
      if (rows.length) {
        res.render('errorsignup', {
          who: 'Student',
          actionRoute: '/student/signup',
          errormsg: 'Email Aldready Exit!'
        });
      } else {
        // if there is no user with that email
        // create the user
        sql.connection.query(`INSERT INTO ${loginTable} SET ?`, post, function(
          error,
          results,
          fields
        ) {
          if (error) throw error;

          // Print it
          console.log('Successfully write -> ' + results);
          req.login(post, err => {
            res.render('profile');
          });
        });
      }
    }
  );
};
