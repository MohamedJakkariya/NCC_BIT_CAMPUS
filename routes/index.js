const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const manipulationforAdmin = require('../db/manipulationforAdmin');


// Welcome Page
router.get('/',(req, res) => res.render('index'));

// Dashboard
router.get('/dashboard',ensureAuthenticated, (req, res) =>
  manipulationforAdmin.showAllStudents(req, res)
);

router.get('/profile',ensureAuthenticated,(req, res) => {
  console.log(req.user);
  
  res.render('profile', {
    user: req.user
  });
});

router.get('/update', ensureAuthenticated,(req, res) => {
  console.log(req.user);
  res.render('update',{
    user : req.user
  });
});
module.exports = router;
 