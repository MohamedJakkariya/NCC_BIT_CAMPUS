// Load the user model
// const Admin = require('../models/Admin');
const Login = require('../models/User');
const Event = require('../models/Event');

exports.showAllStudents = (req, res, route) => {
  let noOfVerified = 0, noOfUnverified = 0;

  Login.find({}, 'id fullname district degree profile yearOfJoin isVerified', async (err, docs) => {
      if(err) throw err;

      await docs.forEach(doc => {
        if(doc.isVerified){
          noOfVerified++;
        }else{
          noOfUnverified++;
        }
      });
      
      await res.render(route, {
        students : docs,
        noOfVerified: noOfVerified,
        noOfUnverified: noOfUnverified
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