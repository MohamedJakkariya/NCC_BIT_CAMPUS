const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const manipulation = require('../db/manipulation');

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
  console.log(req.body);
  
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
    peraddress,
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
    kinaddress
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
    const action = '/student/signup';
    res.render('register', {
      errors,
      action,
    });
  } else {
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
          peraddress,
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
          kinrelation
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

router.post('/update', (req, res, next) => {
  console.log(req.body);

  manipulation.findAndUpdate(req, res);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/student/signin');
});

module.exports = router;
