$(document).ready(function () {
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
