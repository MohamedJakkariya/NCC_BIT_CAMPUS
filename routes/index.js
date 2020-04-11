const express = require('express');
const router = express.Router();
const { } = require('../config/auth');
const manipulationforAdmin = require('../db/manipulationforAdmin');


// Welcome Page
router.get('/',(req, res) => res.render('index'));

// Dashboard
router.get('/dashboard', (req, res) =>
  manipulationforAdmin.showAllStudents(req, res)
);

router.get('/profile',(req, res) => { 
  res.render('profile', {
    user: req.user
  });
});


router.get('/update', (req, res) => {
  console.log(req.user);
  res.render('update',{
    user : req.user
  });
});

router.get('/events', (req, res) => {
  const ejsFile = 'events';
  manipulationforAdmin.viewAllEvents(req, res, ejsFile); 
});
module.exports = router;
 