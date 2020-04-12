$(document).ready(function () {
  // Bootstrap plugin 
  $('[data-toggle="tooltip"]').tooltip();


  // view pdf input field
  $('#pdf').click(() => {
    console.log('clicked');
    // $('#send').css('display', 'unset');
    $('#submit-pdf').css('display', 'unset');
    $('.fa-send').css('display', 'unset');
    $('#close-icon').css('display', 'unset');
    $('#pdf-icon').css('display', 'none');
    $('#pdf').css('display', 'none');
    $('#send').animate({
      'left': '-13rem'
    }, 500);
    $('#send').focus();
  });

  $('#close-icon').click(() => {
    $('#send').animate({
      'left': '5rem'
    }, 500);
    $('#submit-pdf').css('display', 'unset');
    $('.fa-send').css('display', 'none');
    $('#close-icon').css('display', 'none');
    $('#pdf').css('display', 'unset');
  });

  // Button loading animation
  $('.submit').click(() => {
    $('.submit').waitMe({
      effect: 'facebook',
      text: '',
      bg: 'rgba(255,255,255,0.7)',
      color: '#000',
      maxSize: '',
      waitTime: -1,
      textPos: 'vertical',
      fontSize: '',
      source: '',
      onClose: function () {},
    });
  });

  // container loading animation 
  $('.submit-pdf').click(() => {
    if(document.getElementById('send').value != ''){
      $('.container-box').waitMe({
        effect: 'win8',
        text: 'Generation takes couple of minutes...',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        waitTime: -1,
        textPos: 'vertical',
      });
    }
  });
  
   // container loading animation 
   $('.send-pdf').click(() => {
    $('.waitForSend').waitMe({
      effect: 'win8',
      text: 'Generation takes couple of minutes...',
      bg: 'rgba(255,255,255,0.7)',
      color: '#000',
      waitTime: -1,
      textPos: 'vertical',
    });
  });

  // Slide show
  $('.lazy').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1500,
    fade: true,
    cssEase: 'linear',
  });

  $('.mobile-toggler').click((e) => {
    console.log('clicked');
    $('.profile-nav').toggle('slow', 'linear');
  });

  $('.back-to-top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 800);

    return false;
  });

  $('.center-slide').slick({
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  });
});
