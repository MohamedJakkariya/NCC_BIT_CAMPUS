const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  passport = require('passport'),
  manipulation = require('../db/manipulationforStud'),
  crypto = require('crypto-random-string'),
  nodemailer = require('nodemailer'),
  { ensureAuthenticated } = require('../config/auth');

// Load User model
const Login = require('../models/User');

// Login Page
router.get('/signup', (req, res) => res.render('signup'));

// Register Page
router.get('/signin', (req, res) =>
  res.render('login', {
    action: '/student/signin',
  })
);

// Register
router.post('/signup', (req, res) => {
  let file;
  let profile;
  console.log(req.body);
  if (req.files != null) {
    file = req.files.profile_img;
    profile = file.name;

    console.log(file);
    console.log(profile);

    // Check type of the image
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      // Store images to server
      file.mv('public/img/uploaded_images/' + file.name, function (err) {
        if (err) {
          console.log('Something went wrong when the insert!');
          errors.push({
            msg: 'Something went wrong to store the image onto the server',
          });
        }
      });
    } else {
      errors.push({
        msg:
          "This image format is not allowed , please upload file with '.png','.jpg'",
      });
    }
  }

  const {
    fullname,
    email,
    password,
    password2,
    fathername,
    mothername,
    gender,
    mobile,
    dob,
    age,
    nationality,
    college,
    stream,
    unit,
    state,
    district,
    education,
    phone,
    comaddress,
    comstate,
    comdist,
    postoffice,
    post,
    railway,
    paraddress,
    degree,
    yearOfJoin,
    uniquemark,
    bloodgroup,
    medicalcomplaints,
    sport1,
    sport2,
    sport3,
    curricular1,
    curricular2,
    curricular3,
    criminal,
    senticriminal,
    willing,
    radio,
    serve,
    kinrelation,
    anytimebefore,
    prevenno,
    prevres,
    dismissed,
    kinname,
    kinmob,
    kinaddress,
  } = req.body;
  let errors = [];

  if (!fullname || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render('signup', {
      errors,
    });
  } else {
    // Store data on to the database
    Login.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          action,
        });
      } else {
        const type = 'Login';

        const newUser = new Login({
          fullname,
          email,
          password,
          type,
          fathername,
          mothername,
          gender,
          mobile,
          dob,
          age,
          nationality,
          college,
          stream,
          unit,
          state,
          district,
          education,
          phone,
          comaddress,
          comstate,
          comdist,
          paraddress,
          postoffice,
          post,
          railway,
          degree,
          yearOfJoin,
          paraddress,
          uniquemark,
          bloodgroup,
          medicalcomplaints,
          sport1,
          sport2,
          sport3,
          curricular1,
          curricular2,
          curricular3,
          criminal,
          senticriminal,
          willing,
          radio,
          serve,
          anytimebefore,
          prevenno,
          prevres,
          dismissed,
          kinname,
          kinmob,
          kinaddress,
          kinrelation,
          profile,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/student/signin');
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/signin', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/student/signin',
    failureFlash: true,
  })(req, res, next);
});

// Update route
router.post('/update', (req, res, next) => {
  console.log(req.body);

  manipulation.findAndUpdate(req, res);
});

// Get profile for particular student
router.get('/profile', ensureAuthenticated, (req, res, next) => {
  var id = req.query.id;
  console.log(id);
  Login.findById(id, (err, doc) => {
    if (err) throw err;

    console.log(doc);

    if (doc.length <= 0) {
      req.flash('error_msg', "The Profile Doesn't Exist");
      res.redirect('/dashboard');
    }

    res.render('profile', {
      user: doc,
    });
  });
});

// Update account details
router.get('/account-details', ensureAuthenticated, (req, res) => {
  res.render('account-details', {
    user: req.user,
  });
});

router.post('/account-details', (req, res) => {
  manipulation.updatePassword(req, res);
});

// Forgot password route
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

// Sent password to that mail
router.post('/forgot-password', (req, res, next) => {
  const generatedText = crypto({ length: 40 });
  console.log(generatedText);

  console.log('step 1 find the email and store into resetToken');

  Login.findOne(
    { email: req.body.email },
    'resetToken resetTokenExpire email',
    null,
    (err, user) => {
      if (err) throw err;

      console.log(user);

      // User doen't exist
      if (!user) {
        req.flash(
          'error_msg',
          `The Student with this ${req.body.email} is not Exist!`
        );
        return res.redirect('/student/forgot-password');
      } else {
        user.resetToken = generatedText;
        user.resetTokenExpire = Date.now() + 60000; //10 Min validation
        console.log(user);

        user.save((err) => {
          if (err) {
            console.log(
              'something went wron to save the resetTokent into db...'
            );
          }

          // Send the token to target mail
          console.log('step 2');

          var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: "mdjack01122000@gmail.com",
              pass: "Mdjack9524369244thasinfathima",
            },
          });

          var mailOptions = {
            to: user.email,
            from: 'mdjack01122000@gmail.com',
            subject: 'NCC(Bit) Password Reset',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:(only valid for 10mins)\n\n' +
              'http://' +
              req.headers.host +
              '/student/password-reset/' +
              generatedText +
              '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };

          console.log(mailOptions);
          console.log('step 3');

          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              console.log(
                'something went wront to sent the link to mail!' + err
              );
            }

            req.flash(
              'success_msg',
              `Your password is sent to ${req.body.email} mail!`
            );
            console.log('successfully sent the link');
            return res.redirect('/student/forgot-password');
          });
        });
      }
    }
  );
});

// Get the link page
router.get('/password-reset/:token', function (req, res) {
  Login.findOne(
    { resetToken: req.params.token, resetTokenExpire: { $gt: Date.now() } },
    'resetToken email',
    function (err, user) {
      console.log(user);
      if (!user) {
        req.flash(
          'error_msg',
          'Password reset token is invalid or has expired.'
        );
        return res.redirect('/student/forgot-password');
      }
      res.render('password-reset', {
        user: user,
      });
    }
  );
});

// Password change into db and confirmation email send to student
router.post('/password-reset/:token', function (req, res) {
  let errors = []; 

  const { password, password2 } = req.body;
  // Check they give password or not
  if (!password || !password2) {
    errors.push({ msg: 'Fill all the fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log(errors);
    const user = {
      email : req.body.email,
      resetToken : req.params.token
    }
    res.render('password-reset', {
      errors,
      user: user
    });
  } else {
    Login.findOne(
      {
        resetToken: req.params.token,
        resetTokenExpire: { $gt: Date.now() },
      },
      function (err, user) {
        if (!user) {
          req.flash(
            'error_msg',
            'Password reset token is invalid or has expired.'
          );
          return res.redirect('/student/forgot-password');
        }
  
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            console.log('password' + user.password + 'and the user is' + user);
  
            user
              .save(function (err) {
                if (err) {
                  console.log('here');
                  req.flash(
                    'error_msg',
                    'Password is not changed try again after sometime!'
                  );
                  return res.redirect('/student/forgot-passoword');
                } else {
                  console.log('wait for sending confimation mail....');
                  // Send confirmation mail to student
                  var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: "mdjack01122000@gmail.com",
                      pass: "Mdjack9524369244thasinfathima"
                    },
                  });
  
                  var mailOptions = {
                    to: user.email,
                    from: 'mdjack01122000@gmail.com',
                    subject: 'Your password has been changed',
                    text:
                      'Hello,\n\n' +
                      ' - This is a confirmation that the password for your account ' +
                      user.email +
                      ' has just been changed.\n',
                  };
  
                  transporter.sendMail(mailOptions, function (err) {
                    // req.flash('success', 'Success! Your password has been changed.');
                    console.log('successfully changed!');
                    // done(err);
  
                    req.flash(
                      'success_msg',
                      'Password is changed now you can signin!'
                    );
  
                    return res.redirect('/student/signin');
                  });
                }
              });
              
          });
        });
      }
    );
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/student/signin');
});

module.exports = router;
