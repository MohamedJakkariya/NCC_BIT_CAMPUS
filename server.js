// Configure .env file
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('./db/dbconnection');
const ms = require('./db/manipulation');
const bcrypt = require('bcrypt');
const validation = require('./db/validation');
const {port, key}= require('./config/config');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Session configuration 
app.use(session({
  secret: key,
  resave: false,
  saveUninitialized: true
}));

// initialize the session middleware 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

// Setting ejs view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  sql.connection.query('select * from users where id = ' + id, function(
    err,
    rows
  ) {
    done(err, rows[0]);
  });
});

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
  //var post = { attribute_name_1  : value, attribute_name_1: 'value' };
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    const post = {
      email: req.body.email,
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      password: hash
    };
    ms.write(sql, post, res);
  });

});

// Student signin route
app.get('/student/signin', (req, res) => {
  res.render('signin', { actionRoute: '/student/signin', who: 'Student' });
});

app.post('/student/signin', (req, res) => {
  validation.checkUser(req.body.email, req.body.password, res);
});

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
  res.render('profile');
});

// Port start
app.listen(port, () => {
  console.log(`Server running on port #${port}`);
});
