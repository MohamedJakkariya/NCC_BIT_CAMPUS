// Student signup route
app.get('/student/signup', (req, res) => {
    res.render('signup', { actionRoute: '/student/signup', who: 'Student' });
  });
  
  app.post('/student/signup', async (req, res) => {
    let id;
  
    console.log(req.body);
  
    //var post = { attribute_name_1  : value, attribute_name_1: 'value' };
    // To store register table
  
    var criminal = req.body.criminal === 'true';
    var willing = req.body.willing === 'true';
    var radio = req.body.radio === 'true';
    var serve = req.body.serve === 'true';
    var anytimebefore = req.body.anytimebefore === 'true';
    var dismissed = req.body.dismissed === 'true';
  
    const user = {
      id: id,
      fullname: req.body.fullname,
      fathername: req.body.fathername,
      mothername: req.body.mothername,
      gender: req.body.gender,
      mobile: parseInt(req.body.mobile),
      dob: req.body.dob,
      age: parseInt(req.body.age),
      nationality: req.body.nationality,
      college: req.body.clg,
      stream: req.body.stream,
      unit: req.body.unit,
      state: req.body.state,
      district: req.body.district,
      education: req.body.educ,
      email: req.body.email,
      phone: parseInt(req.body.phone),
      comaddress: req.body.comadd,
      comstate: req.body.comstate,
      comdist: req.body.comdist,
      postoffice: req.body.post,
      post: parseInt(req.body.compin),
      railway: req.body.rail,
      peraddress: req.body.peradd,
      uniquemark: req.body.idmarks,
      bloodgroup: req.body.blood,
      medicalcomplaints: req.body.medical,
      sport1: req.body.sport1,
      sport2: req.body.sport2,
      sport3: req.body.sport3,
      curricular1: req.body.co1,
      curricular2: req.body.co2,
      curricular3: req.body.co3,
      criminal: criminal,
      senticriminal: req.body.sentcriminal,
      willing: willing,
      radio: radio,
      serve: serve,
      anytimebefore: anytimebefore,
      prevenno: req.body.prevenno,
      prevres: req.body.prevres,
      dismissed: dismissed,
      kinname: req.body.kinname,
      kinmob: parseInt(req.body.kinmob),
      kinaddress: req.body.kinadd
    };
  
    await ms.write(sql, 'studentInfo', user, req, res);
  
    // To storing login table
    await bcrypt.hash(req.body.password, 10).then(function(hash) {
      let id;
      const user = {
        id: id,
        email: req.body.loginemail,
        password: hash,
        type: 'student'
      };
  
      ms.write(sql, 'studentLogin', user, req, res);
  
    });
  });
  
  // Student signin route
  app.get('/student/signin', (req, res) => {
    res.render('signin', { actionRoute: '/student/signin', who: 'Student' });
  });
  
  // validation.checkUser(req.body.email, req.body.password, res);
  app.post('/student/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    ms.read(sql, email, password, res);
  });
  
  // Admin sign up  for personal
  // app.get('/admin/signup', (req, res) => {
  //   res.render('signup', { actionRoute: '/admin/signup', who: 'Admin' });
  // });
  
  // app.post('/admin/signup', (req, res) => {
  //   let id;
  
  //   bcrypt.hash(req.body.password, 10).then(function(hash) {
  //     const user = {
  //       id: id,
  //       email: req.body.email,
  //       firstName: req.body.firstName,
  //       secondName: req.body.secondName,
  //       password: hash,
  //       type: 'admin'
  //     };
  
  //     ms.write(sql, user, req, res);
  //   });
  // });
  
  //Admin signin route
  app.get('/admin/signin', (req, res) => {
    res.render('signin', { actionRoute: '/admin/signin', who: 'Admin' });
  });
  
  app.post('/admin/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    ms.read(sql, email, password, res);
  });
  
  app.get('/admin/panel', (req, res) => {
    res.render('dashboard');
  });
  



  
      // async.parallel(
      //   [
      //     function (cb) {
      //       Login.findOne({ email: email }, function (err, user) {
      //         if (err) {
      //           return done(err);
      //         }
      //         if (!user) {
      //           return done(null, false,{message: 'Email not Registered'});
      //         }
      //         // Match password
      //         bcrypt.compare(password, user.password, (err, isMatch) => {
      //           if (err) throw err;
      //           if (isMatch) {
      //             return done(null, user);
      //           } else {
      //             return done(null, false, { message: 'Password incorrect' });
      //           }
      //         });
      //       });
      //     },
      //     function (cb) {
      //       Admin.findOne({ email: email }, function (err, user) {
      //         if (err) {
      //           return done(err);
      //         }
      //         if (!user) {
      //           return done(null, false,{ message: 'Email not Registered' });
      //         }
      //         // Match password
      //         bcrypt.compare(password, user.password, (err, isMatch) => {
      //           if (err) throw err;
      //           if (isMatch) {
      //             return done(null, user);
      //           } else {
      //             return done(null, false, { message: 'Password incorrect' });
      //           }
      //         });
      //       });
      //     },
      //   ],
      //   ([res1, res2]) => {
      //     // on result
      //     done(null, res1);
      //     // OR
      //     done(null, res1);
      //   }
      // );