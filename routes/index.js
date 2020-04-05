const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/',(req, res) => res.render('index'));

// Dashboard
router.get('/dashboard',ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/profile',ensureAuthenticated,(req, res) => {
  console.log(req.user);
  
  res.render('profile', {
    user: req.user
  });
});

router.get('/update', ensureAuthenticated,(req, res) => {
  // console.log(req.user);
  res.send('Update workspace');
});
module.exports = router;
 