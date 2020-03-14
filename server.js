const express = require('express');
const sql = require('./db/dbconnection');
const app = express();

app.use(express.static(__dirname + '/public'));

// Establised connection
sql.connection;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pagelinks/index.html');
});

// Studet signup route
app.get('/student/signup', (req, res) => {
  res.sendFile(__dirname + '/public/pagelinks/studentSignUp.html');
});

app.post('/studet/signup', (req, res) => {});

app.listen(4000, () => {
  console.log('Server running on port #4000');
});
