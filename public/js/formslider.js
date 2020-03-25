$(document).ready(function() {
  var w = $('#w');

  const container = document.querySelector('#w');

  var login = $('#content-login');
  var applicant = $('#content-register');
  var contact = $('#contact-details');
  var curricular = $('#curricular-details');
  var other = $('#other-details');

  // Auto Focusing
  $('#loginemail').focus();

  $('#view-details').on('click', e => {
    e.preventDefault();

    var lh = login.height();
    var ah = applicant.height();
    var coh = contact.height();
    var cuh = curricular.height();
    var oh = other.height();

    var tot = lh + ah + coh + cuh + oh;

    // for reducting the size of the all buttons height
    tot -= 160;

    $(w).css('display', 'block');

    $(login).css('display', 'block');

    $(other)
      .stop()
      .animate(
        {
          top: '880px'
        },
        300,
        function() {
          $(login)
            .stop()
            .animate(
              {
                left: '0px'
              },
              500,
              function() {
                // Remove all focus excep login email
                $('#email').blur();
                $('#sport1').blur();
                $('#fname').blur();
                $('#criminal_0').blur();

                $('#loginemail').focus();
              }
            );

          // applicant
          $(applicant).css('display', 'block');
          $(applicant).css('position', 'unset');

          // contact
          $(contact).css('display', 'block');
          $(contact).css('position', 'unset');

          // curricular
          $(curricular).css('display', 'block');
          $(curricular).css('position', 'unset');

          // other
          $(other).css('display', 'block');
          $(other).css('position', 'unset');

          $('button').css('display', 'none');

          $('#submit').css('display', 'unset');

          $('#page')
            .stop()
            .animate(
              {
                height: tot + 'px'
              },
              550,
              function() {
                /* callback */
              }
            );
        }
      );
  });

  /* display the Applicant page */
  $('#showregister').on('click', function(e) {
    e.preventDefault();
    var newheight = applicant.height();
    $(applicant).css('display', 'block');

    $(login)
      .stop()
      .animate(
        {
          left: '-880px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $(applicant)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          $(login).css('display', 'none');
          $('#fname').focus();
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-1').css('background-color', '#343A40');
  });

  // Shor previous login page
  $('#previouslogin').on('click', function(e) {
    e.preventDefault();
    var newheight = login.height();
    $(login).css('display', 'block');

    $(applicant)
      .stop()
      .animate(
        {
          left: '880px'
        },
        800,
        function() {
          $(applicant).css('display', 'none');
          // Auto Focusing
          $('#loginemail').focus();
        }
      );

    $(login)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          $(applicant).css('display', 'none');
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-1').css('background-color', 'unset');
  });

  /* display the contact page */
  $('#showcontact').on('click', function(e) {
    e.preventDefault();
    var newheight1 = contact.height();
    $(contact).css('display', 'block');

    $(applicant)
      .stop()
      .animate(
        {
          left: '-880px'
        },
        800,
        function() {
          $(applicant).css('display', 'none');
          // Auto Focusing
          $('#email').focus();
        }
      );

    $(contact)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight1 + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );
    $('#ball-2').css('background-color', '#343A40');
  });

  // display previous applicant page
  $('#previousapplicant').on('click', function(e) {
    e.preventDefault();
    var newheight1 = applicant.height();
    $(applicant).css('display', 'block');

    $(contact)
      .stop()
      .animate(
        {
          left: '880px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $(applicant)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          $(contact).css('display', 'none');
          // Auto Focusing
          $('#fname').focus();
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight1 + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-2').css('background-color', 'unset');
  });

  /* display the Curricular page */
  $('#showcurricular').on('click', function(e) {
    e.preventDefault();
    var newheight1 = curricular.height();
    $(curricular).css('display', 'block');

    $(contact)
      .stop()
      .animate(
        {
          left: '-880'
        },
        800,
        function() {
          $(contact).css('display', 'none');

          // Auto Focusing
          $('#sport1').focus();
        }
      );

    $(curricular)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight1 + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-3').css('background-color', '#343A40');
  });

  // display previous contact page
  $('#previouscontact').on('click', function(e) {
    e.preventDefault();
    var newheight1 = contact.height();
    $(contact).css('display', 'block');

    $(curricular)
      .stop()
      .animate(
        {
          left: '880px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $(contact)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          $(curricular).css('display', 'none');
          // Auto Focusing
          $('#email').focus();
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight1 + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-3').css('background-color', 'unset');
  });

  /* display the Other page */
  $('#showothers').on('click', function(e) {
    e.preventDefault();
    var newheight = other.height();
    $(other).css('display', 'block');

    $(curricular)
      .stop()
      .animate(
        {
          left: '-880'
        },
        800,
        function() {
          $(contact).css('display', 'none');

          // Auto Focusing
          $('#criminal_0').focus();
        }
      );

    $(other)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-4').css('background-color', '#343A40');
  });

  // display previous Curricular page page
  $('#previouscurricular').on('click', function(e) {
    e.preventDefault();
    var newheight1 = curricular.height();
    $(curricular).css('display', 'block');

    $(other)
      .stop()
      .animate(
        {
          left: '880px'
        },
        800,
        function() {
          /* callback */
        }
      );

    $(curricular)
      .stop()
      .animate(
        {
          left: '0px'
        },
        800,
        function() {
          $(other).css('display', 'none');

          // Auto Focusing
          $('#sport1').focus();
        }
      );

    $('#page')
      .stop()
      .animate(
        {
          height: newheight1 + 'px'
        },
        550,
        function() {
          /* callback */
        }
      );

    $('#ball-4').css('background-color', 'unset');
  });
});
