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
