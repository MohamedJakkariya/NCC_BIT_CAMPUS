// Configure .env file
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('./db/dbconnection');
const ms = require('./db/manipulation');
const bcrypt = require('bcrypt');
const validation = require('./db/validation');
const { port, key } = require('./config/config');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./config/passport');
const LocalStrategy = require('passport-local').Strategy;
const { tableName } = require('./config/config');

const app = express();

// Session configuration
app.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.static(__dirname + '/public'));
// Setting ejs view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//NOTE: Db connection are automatically establised and disconnected

//WRITE data passed argumemt like this format satisfied!
//var post = { attribute_name_1  : value, attribute_name_1: 'value' };

app.get('/', (req, res) => {
  res.render('index');
});

// Student signup route
app.get('/student/signup', (req, res) => {
  res.render('signup', { actionRoute: '/student/signup', who: 'Student' });
});

app.post('/student/signup', (req, res) => {
  let id;
  //var post = { attribute_name_1  : value, attribute_name_1: 'value' };
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    const user = {
      id: id,
      email: req.body.email,
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      password: hash,
      type: 'student'
    };

    ms.write(sql, user, req, res);

  });
});

// Student signin route
app.get('/student/signin', (req, res) => {
  res.render('signin', { actionRoute: '/student/signin', who: 'Student' });
});

// validation.checkUser(req.body.email, req.body.password, res);
app.post(
  '/student/signin',
  passport.authenticate('local-login', {
    successRedirect: '/student/profile',
    failureRedirect: '/student/signin',
    failureFlash: true
  })
);

//Admin signin route
app.get('/admin/signin', (req, res) => {
  res.render('signin', { actionRoute: '/admin/signin', who: 'Admin' });
});

app.post('/admin/signin', (req, res) => {});

app.get('/admin/panel', (req, res) => {
  res.render('dashboard');
});

// Testing route
app.get('/student/profile', (req, res) => {
  passport.authenticate('local-login')(req,res, () => {
    res.redirect('/student/profile');
  });
});

// Port start
app.listen(port, () => {
  console.log(`Server running on port #${port}`);
});
