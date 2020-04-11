const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const Admin = require('../models/Admin');
const Event = require('../models/Event');
const Login = require('../models/User');
const manipulationforAdmin = require('../db/manipulationforAdmin');
const {} = require('../config/auth');
const util = require('../utils/utilityfn');

// Login Page
router.get('/signup', (req, res) =>
  res.render('register', {
    action: '/admin/signup',
  })
);

// Register Page
router.get('/signin', (req, res) =>
  res.render('login', {
    action: '/admin/signin',
  })
);

// Register
router.post('/signup', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
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
    const action = '/admin/sigup';
    res.render('register', {
      errors,
      action,
    });
  } else {
    Admin.findOne({ email: email }).then((user) => {
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
        const type = 'Admin';
        const newUser = new Admin({
          name,
          email,
          password,
          type,
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
                res.redirect('/admin/signin');
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
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/admin/signin',
    failureFlash: true,
  })(req, res, next);
});

router.get('/event-post', (req, res) => {
  res.render('event-post', { event: event });
});

router.post('/event-post', (req, res) => {
  let errors = [];
  var files;

  let { eventname, dateandtime, description } = req.body;

  if (!eventname || !dateandtime || !description || !req.files) {
    errors.push({ msg: 'Please fill all the fields!' });
  } else if (
    req.files.uploaded_img.mimetype === 'image/jpeg' ||
    req.files.uploaded_img.mimetype === 'image/png'
    // Store images to server
  ) {
    files = req.files.uploaded_img;

    files.mv('public/img/events/' + files.name, function (err) {
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
        "This image format is not allowed , please upload image with '.png','.jpg'",
    });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render('event-post', {
      errors,
      event,
    });
  } else {
    // Create Event object
    const newEvent = new Event({
      eventName: eventname,
      date: dateandtime,
      imageName: files.name,
      description: description,
    });

    newEvent.save((err) => {
      if (err) throw err;
      req.flash('success_msg', 'Successfully event posted!');
      res.redirect('/admin/event-post');
    });
  }
});

router.get('/event-edit', (req, res) => {
  const ejsFile = 'event-edit';
  manipulationforAdmin.viewAllEvents(req, res, ejsFile);
});

router.get('/event-edit/:id', (req, res) => {
  console.log(req.params.id);

  Event.findById(req.params.id, (err, event) => {
    if (err) throw err;

    res.render('event-post', {
      event: event,
    });
  });
});

router.post('/event-update/:id', (req, res) => {
  const id = req.params.id;
  let errors = [];
  var files;

  console.log(id);

  const { eventname, dateandtime, description } = req.body;

  if (!eventname || !dateandtime || !description || !req.files) {
    errors.push({ msg: 'Please fill all the fields!' });
  } else if (
    req.files.uploaded_img.mimetype === 'image/jpeg' ||
    req.files.uploaded_img.mimetype === 'image/png'
  ) {
    // Store images to server
    files = req.files.uploaded_img;

    files.mv('public/img/events/' + files.name, function (err) {
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
        "This image format is not allowed , please upload image with '.png','.jpg'",
    });
  }

  if (errors.length > 0) {
    console.log(errors);
    req.flash('error_msg', 'Please fill all the fields!');
    res.redirect(`/admin/event-edit/${id}`);
  } else {
    Event.findOne({ _id: id }, (err, event) => {
      if (err) throw err;

      console.log(event);

      event.eventName = eventname;
      event.date = dateandtime;
      event.description = description;
      event.imageName = files.name;

      event.save((err) => {
        if (err) throw err;
        req.flash('success_msg', 'Successfully the Event was updated!');

        res.render('event-post', {
          event: event,
        });
      });
    });
  }
});

router.get('/event-delete/:id', (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  // Delete the document
  Event.findByIdAndRemove(id, (err, doc) => {
    if (err) throw err;
    req.flash('success_msg', 'Successfully the Event is Deleted!');

    res.redirect('/admin/event-edit');
  });
});

// Pdf generation route 
router.get('/pdfGenerate', (req, res) => {
  console.log(req.query.year);

  // Filter the document and prepare the html 
  Login.find({yearOfJoin : req.query.year}, (err, docs) => {
    if(docs <= 0){  
      req.flash('error_msg', "This year students doen't found!");
      res.redirect('/dashboard');
    }else{
      util.dynamicHtml(req, res,docs);
    }
  });
});

// Alise name of pdfGenerate route 
router.get('/pdfGenerateAndSent', (req, res) => {
  res.render('pdfSend', {
    year: req.query.year,
    filename: pdfFilename,
    filepath: `../pdf/${pdfFilename}`
  });
});

// Pdf sent to the mail Route 
router.post('/pdf-post/:year', (req, res) => {
  console.log(req.params.year);
  const email = req.body.email;
  const year = req.params.year;
  if (!email) {
    req.flash('error_msg', 'Please enter the email!');

    res.redirect(`/admin/pdfGenerateAndSent?year=${year}`);
  } else {
    req.flash('success_msg', 'Email Successfully sent!');

    res.redirect(`/admin/pdfGenerateAndSent?year=${year}`);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/admin/signin');
});

module.exports = router;
