// Load the user model
// const Admin = require('../models/Admin');
const Login = require('../models/User');
const Event = require('../models/Event');

exports.showAllStudents = (req, res) => {
  Login.find({}, 'id fullname district degree profile yearOfJoin', (err, docs) => {
      if(err) throw err;
      
      res.render('dashboard', {
        students : docs
      });
  });
};

// View All Events 
exports.viewAllEvents = (req, res, ejsFile) => {
  Event.find({}, (err, events) => {
      if(err) throw err;
      console.log(events);
      res.render(`${ejsFile}`, {
        events : events  
      });
      // return events;
  });
};

// get the particular year based students 
exports.getYearBasedStudents = (req, res, year) => {

}