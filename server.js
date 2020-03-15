const express = require('express');
const bodyParser = require('body-parser');
const sql = require('./db/dbconnection');
const ms = require('./db/manipulation');
const app = express();

app.use(express.static(__dirname + '/public'));

// Setting ejs view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

//NOTE: Db connection are automatically establised and disconnected

//WRITE data passed argumemt like this format satisfied!
//var post = { attribute_name_1  : value, attribute_name_1: 'value' };

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pagelinks/index.html');
});

// Student signup route
app.get('/student/signup', (req, res) => {
  res.sendFile(__dirname + '/public/pagelinks/studentSignUp.html');
});

app.post('/student/signup', (req, res) => {
  //var post = { attribute_name_1  : value, attribute_name_1: 'value' };

  var post = {
    email: req.body.email,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    password: req.body.password
  };

  ms.write(sql, post, res);
});

// Student signin route
app.get('/student/signin', (req, res) => {
  res.sendFile(__dirname + '/public/pagelinks/studentSignIn.html');
});

app.post('/student/signin', (req, res) => {
  ms.read(sql, req.body.email, res);
});

// Port start
app.listen(4000, () => {
  console.log('Server running on port #4000');
});
