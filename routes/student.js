const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  passport = require('passport'),
  manipulation = require('../db/manipulationforStud'),
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
  console.log(req.body)
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
router.get('/profile',ensureAuthenticated,(req, res, next) => {
  var id = req.query.id;
  console.log(id);  
  Login.findById(id, (err, doc) => {
      if(err) throw err;

      console.log(doc);
      
      if(doc.length <= 0){
        req.flash(
          'error_msg',
          "The Profile Doesn't Exist"
        );
        res.redirect('/dashboard');
      }

      res.render('profile', {
        user: doc
      });
    });
});

// Update account details 
router.get('/account-details',ensureAuthenticated, (req, res) => {
  res.render('account-details', {
    user : req.user
  });
});

router.post('/account-details', (req, res) => {
  manipulation.updatePassword(req, res);
});

// Forget password route 


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/student/signin');
});

module.exports = router;
