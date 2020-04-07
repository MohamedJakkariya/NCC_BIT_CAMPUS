
// Load User model
const Login = require('../models/User');

exports.findAndUpdate = (req, res) => {
  var file;
  let filter;
  let update;

  console.log(req.files);
  
  if (req.files === null) {
    filter = { id: req.body.id };
    update = {
      fullname: req.body.fullname,
      fathername: req.body.fathername,
      mothername: req.body.mothername,
      mobile: req.body.mobile,
      age: req.body.age,
      college: req.body.college,
      stream: req.body.stream,
      unit: req.body.unit,
      education: req.body.education,
      comaddress: req.body.comaddress,
      postoffice: req.body.postoffice,
      post: req.body.post,
      railway: req.body.railway,
      degree: req.body.degree,
      uniquemark: req.body.uniquemark,
      bloodgroup: req.body.bloodgroup,
      medicalcomplaints: req.body.medicalcomplaints,
      sport1: req.body.sport1,
      sport2: req.body.sport2,
      sport3: req.body.sport3,
      curricular1: req.body.curricular1,
      curricular2: req.body.curricular2,
      curricular3: req.body.curricular3,
      criminal: req.body.criminal,
      radio: req.body.radio,
      serve: req.body.serve,
      anytimebefore: req.body.anytimebefore,
      prevenno: req.body.prevenno,
      prevres: req.body.prevres,
      dismissed: req.body.dismissed,
      kinname: req.body.kinname,
      kinaddress: req.body.kinaddress,
      willing: req.body.willing,
      kinrelation: req.body.kinrelation
    };

    // `doc` is the document _before_ `update` was applied
    Login.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
      if (err) {
        console.log('Something went wrong when the update!');
        req.flash('error_msg', 'Something went wrong when Updated!');
        res.redirect('/update');
      }
      console.log(doc);
      req.flash(
        'success_msg',
        'Successfully Updated!'
      );
      res.redirect('/update');
    });
  } else {
    file = req.files.profile_img;
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      file.mv('public/img/uploaded_images/' + file.name, function (err) {
        if (err) {
          console.log('Something went wrong when the update!');
          req.flash(
            'error_msg',
            'Something went wrong Check your updating details!'
          );
          res.redirect('update');
        } else {
          filter = { id: req.body.id };
          update = {
            fullname: req.body.fullname,
            fathername: req.body.fathername,
            mothername: req.body.mothername,
            mobile: req.body.mobile,
            age: req.body.age,
            college: req.body.college,
            stream: req.body.stream,
            unit: req.body.unit,
            education: req.body.education,
            comaddress: req.body.comaddress,
            postoffice: req.body.postoffice,
            post: req.body.post,
            railway: req.body.railway,
            degree: req.body.degree,
            uniquemark: req.body.uniquemark,
            bloodgroup: req.body.bloodgroup,
            medicalcomplaints: req.body.medicalcomplaints,
            sport1: req.body.sport1,
            sport2: req.body.sport2,
            sport3: req.body.sport3,
            curricular1: req.body.curricular1,
            curricular2: req.body.curricular2,
            curricular3: req.body.curricular3,
            criminal: req.body.criminal,
            radio: req.body.radio,
            serve: req.body.serve,
            anytimebefore: req.body.anytimebefore,
            prevenno: req.body.prevenno,
            prevres: req.body.prevres,
            dismissed: req.body.dismissed,
            kinname: req.body.kinname,
            kinaddress: req.body.kinaddress,
            willing: req.body.willing,
            kinrelation: req.body.kinrelation,
            profile: file.name,
          };

          // `doc` is the document _before_ `update` was applied
          Login.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
            if (err) {
              console.log('Something went wrong when the update!');
              req.flash('error_msg', 'Something went wrong when Updated!');
              res.redirect('/update');
            }
            console.log(doc);
            req.flash(
              'success_msg',
              'Successfully Updated!'
            );
            res.redirect('/update');
          });
        }
      });
    } else {
      req.flash(
        'error_msg',
        "This format is not allowed , please upload file with '.png','.gif','.jpg'"
      );
      res.redirect('/update');
    }
  }
};
