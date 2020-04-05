const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Login = require('../models/User');
const Admin = require('../models/Admin');


module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // // Match user
      Login.findOne({
        email: email
      }).then(user => {
        if (!user) {
          // return done(null, false, { message: 'That email is not registered' });
          // Check another table 

          Admin.findOne({
            email: email
          }).then(user => {
            if (!user) {
              return done(null, false, { message: 'That email is not registered' });
            }
    
            if(user.password != null){
              // Match password
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              }); //End of bcrypt
            }
          }); // End of Then
        } // End of If

        if(user.password != null){
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        }
    });
    })
  );

  passport.serializeUser(function (user, done) {
    console.log('In serializeUser' + user);
    const type = user.type;
    const id = user.id;
    const obj = { id, type };
    done(null, obj);
  });

  passport.deserializeUser(function (obj, done) {
    console.log('In deserializeUser  id is = '+ obj.type);
    
    const condtion = obj.type === 'Login'? true: false;

    if(condtion){
      Login.findById(obj.id, function (err, user) {
        if (err) {console.log(err);}
        done(err, user);
      });
    }else{
      Admin.findById(obj.id, function (err, user) {
          console.log(err);
          if (err) {console.log(err);}
          done(err, user)  
        });
      }    
  });
};
