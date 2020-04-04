// Configure .env file
const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const ejsLint = require('ejs-lint');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/public'));

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology : true 
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Setting ejs view engine
// app.use(expressLayouts);
app.set('view engine', 'ejs');
ejsLint('ejs', {async : true}); 

// Session configuration
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/student', require('./routes/student.js'));
app.use('/admin', require('./routes/admin.js'));


const PORT = process.env.PORT || 4000;

// Port start
app.listen(PORT, () => {
  console.log(`Server running on port #${PORT}`);
});
