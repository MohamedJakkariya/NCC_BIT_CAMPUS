const nodemailer = require('nodemailer');

exports.informToAdmin = (studentEmail) => {
      // Send confirmation mail to student
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
      });

      var mailOptions = {
        to: 'jacksparrow.mdjack@gmail.com', ///Admin mail put here to inform it
        from: process.env.EMAIL,
        subject: 'Account Verification',
        text:
          'Hello,\n\n' +
          ' - This is a Inform mail of student signup and Kindly verify it after 7days otherwise the signup account automatically will be truncated!' +
          studentEmail +
          ' is an Unverified Profile.\n',
      };

      transporter.sendMail(mailOptions, function (err) {
        console.log('successfully mail send to admin!');
      });
}

exports.pdfToMail = (email, year) => {
  console.log('wait for sending confimation mail....');
    // Send confirmation mail to student
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    });

    var mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: `The Enrollment students of the year ${year}`,
      text:'Check out this attached pdf file',
      attachments:[{
        filename : 'enroll.pdf',
        path : 'C:/Users/mdjac/Desktop/NCC/public/pdf/enroll.pdf',
        contentType : 'application/pdf'
      }]
    };

    transporter.sendMail(mailOptions, function (err) {
      if(err){
        console.log(err);
        console.log('Successfully sent to mail');
      }
    });
};

// Inform to signup student
exports.informToStudent = (message, studentEmail) => {

   // Send confirmation mail to student
   var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });

  var mailOptions = {
    to: studentEmail, ///Student mail put here to inform it
    from: process.env.EMAIL,
    subject: 'Account Status',
    text: message,
  };

  transporter.sendMail(mailOptions, function (err) {
    console.log('successfully mail send to Student!');
  });
}


exports.bulkMail = (emails, message) => {

        // Send confirmation mail to student
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          },
        });

        var mailOptions = {
          to: emails, ///Admin mail put here to inform it
          from: process.env.EMAIL,
          subject: 'Announcement',
          text:
            'Hi students!,\n\n' + 'This is for Ncc cadets\n\n' +
            message + '\n\n From anna university(Bit campus)'
        };

        transporter.sendMail(mailOptions, function (err) {
          if(err){
            console.log(err);
          }
          console.log('successfully mail sen bulk mail!');
        });

}