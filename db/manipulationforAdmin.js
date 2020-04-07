// Load the user model
// const Admin = require('../models/Admin');
const Login = require('../models/User');

exports.showAllStudents = (req, res) => {
  Login.find({}, 'id fullname district degree profile yearOfJoin', (err, docs) => {
      if(err) throw err;
      
      res.render('dashboard', {
        students : docs
      });
  });
};

