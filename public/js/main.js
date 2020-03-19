$(document).ready(function() {
    $('.search-field').hover(
function() {
  $(this)
    .children('.show')
    .show();
},
function() {
  $(this)
    .children('.show')
    .hide();
}
);

// Slide show
$('.lazy').slick({
infinite: true,
dots: true,
autoplay: true,
autoplaySpeed: 1500,
fade: true,
cssEase: 'linear'
});

$('.mobile-toggler').click(e => {
console.log('clicked');
$('.profile-nav').toggle('slow', 'linear');
});

$('.back-to-top').click(function() {
$('html,body').animate({ scrollTop: 0 }, 800);

return false;
});

});