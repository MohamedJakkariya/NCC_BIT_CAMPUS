// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
const sql = require('../db/dbconnection');
const {tableName} = require('../config/config');

var connection = sql.connection;

// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query(`select * from ${tableName} where id = ${id}`, function(
      err,
      rows
    ) {
      done(err, rows[0]);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // for autoincrement use the temp variable 
        let id;
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query(
          `select * from ${tableName} where email = ${email}`,
          function(err, rows) {
            console.log(rows);
            console.log('above row object');
            if (err) return done(err);
            if (rows.length) {
              return done(
                null,
                false,
                req.flash('signupMessage', 'That email is already taken.')
              );
            } else {
              // if there is no user with that email
              // create the user
              var newUserMysql = new Object();

              newUserMysql.id = id;
              newUserMysql.email = email;
              newUserMysql.password = password; // use the generateHash function in our user model

              var insertQuery =
                `INSERT INTO users (id, email, password ) values (${id},${email},${password})`;
              console.log(insertQuery);
              connection.query(insertQuery, function(err, rows) {
                newUserMysql.id = rows.insertId;

                return done(null, newUserMysql);
              });
            }
          }
        );
      }
    )
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // callback with email and password from our form

        connection.query(
          `SELECT * FROM ${tableName} WHERE email = ${email}`,
          function(err, rows) {
            if (err) {
              res.render('errorsignin', {who: 'Student',actionRoute: '/student/signin',errormsg : "Something went wrong"})
            };
            if (!rows.length) {
              res.render('errorsignin', {who: 'Student',actionRoute: '/student/signin',errormsg : "User doen't exit!"})
            }

            // if the user is found but the password is wrong
            // if (!(rows[0].password == password))
            bcrypt.compare(password, rows[0].password).then(function(result) {
              if(result){
                // all is well, return successful user
                return done(null, rows[0]);	
              }else{
                res.render('errorsignin', {who: 'Student',actionRoute: '/student/signin',errormsg : "Incorrect Password!"})
              }
            });
          }
        );
      }
    )
  );
};
