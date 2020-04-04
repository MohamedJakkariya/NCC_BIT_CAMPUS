const { loginTable } = require('../config/config');
const bcrypt = require('bcrypt');

exports.read = (sql, email, password, res) => {
  // For check validation
  sql.connection.query(
    `SELECT * FROM ${loginTable} WHERE email = "${email}"`,
    function(err, rows) {
      if (err) {
        res.render('errorsignin', {
          who: 'Student',
          actionRoute: '/student/signin',
          errormsg: 'Something went wrong!'
        });
      }
      console.log(rows.length);

      if (rows.length) {
        // if the user is found but the password is wrong
        bcrypt.compare(password, rows[0].password).then(function(result) {
          if (result) {
            // all is well, return successful user
            // for admin
            if (rows[0].type == 'admin') {
              res.render('dashboard');
            } else {
              console.log(rows[0].id);
              // for student
              sql.connection.query(
                `SELECT * FROM studentInfo WHERE id = "${rows[0].id}"`,
                (err, foundUser) => {
                  let formatDate =
                    foundUser[0].dob.getDate() +
                    '-' +
                    (foundUser[0].dob.getMonth() + 1) +
                    '-' +
                    foundUser[0].dob.getFullYear();

                  console.log(formatDate);

                  if (err) {
                    console.log('Error when finding the user...');
                  }

                  console.log(foundUser[0]);
                  let gender;

                  if (foundUser[0].gender === 'M') {
                    gender = 'Male';
                  } else if (foundUser[0].gender === 'F') {
                    gender = 'Female';
                  } else {
                    gender = 'Transgender';
                  }

                  res.render('profile', {
                    name: foundUser[0].fullname,
                    fatherName: foundUser[0].fathername,
                    motherName: foundUser[0].mothername,
                    gender: gender,
                    mobile: foundUser[0].mobile,
                    dob: formatDate,
                    age: foundUser[0].age,
                    nationality: foundUser[0].nationality,
                    college: foundUser[0].college,
                    stream: foundUser[0].stream,
                    unit: foundUser[0].unit,
                    state: foundUser[0].state,
                    district: foundUser[0].district,
                    directorate: 'none',
                    education: foundUser[0].education,
                    email: foundUser[0].email,
                    phone: foundUser[0].phone,
                    comaddress: foundUser[0].comaddress,
                    comstate: foundUser[0].comstate,
                    comdistrict: foundUser[0].comdist,
                    postoffice: foundUser[0].postoffice,
                    post: foundUser[0].post,
                    railway: foundUser[0].railway,
                    peraddress: foundUser[0].peraddress,
                    uniquemark: foundUser[0].uniquemark,
                    bloodgroup: foundUser[0].bloodgroup,
                    medicalcomplaints: foundUser[0].medicalcomplaints,
                    sport1: foundUser[0].sport1,
                    sport2: foundUser[0].sport2,
                    sport3: foundUser[0].sport3,
                    curricular1: foundUser[0].curricular1,
                    curricular2: foundUser[0].curricular2,
                    curricular3: foundUser[0].curricular3,
                    criminal: foundUser[0].criminal,
                    senticriminal: foundUser[0].senticriminal,
                    radio: foundUser[0].radio,
                    willing: foundUser[0].willing
                  });
                }
              );
            }
          } else {
            // for admin
            if (rows[0].type == 'admin') {
              res.render('errorsignin', {
                who: 'Admin',
                actionRoute: '/admin/signin',
                errormsg: 'Incorrect Password!'
              });
            } else {
              // for student
              res.render('errorsignin', {
                who: 'Student',
                actionRoute: '/student/signin',
                errormsg: 'Incorrect Password!'
              });
            }
          }
        });
      } else {
        res.render('errorsignin', {
          who: '',
          actionRoute: '/student/signin',
          errormsg: "User doen't exit!"
        });
      }
    }
  );
};

exports.write = (sql, table, post, req, res) => {
  sql.connection.query(
    `select * from ${table} where email = "${post.email}"`,
    function(err, rows) {
      console.log(rows);
      console.log('above row object');
      if (err) throw err;
      if (rows.length) {
        res.render('errorsignup', {
          who: 'Student',
          actionRoute: '/student/signup',
          errormsg: 'Email Aldready Exit!'
        });
      } else {
        // if there is no user with that email
        // create the user
        sql.connection.query(`INSERT INTO ${table} SET ?`, post, function(
          error,
          results,
          fields
        ) {
          if (error) throw error;

          // Print it
          console.log('Successfully write -> ' + results[0]);
        });
      }
    }
  );
};
