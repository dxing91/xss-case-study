//log in
$('.login-form').on('submit', function(event) {
  event.preventDefault();
  $('.alert').remove();
  var form = $(this);
  var login = form.serialize();

  $.ajax({
    type: 'POST', url: '/login', data: login
  }).done(function(user) {
    if (user) {
      $('.login').replaceWith('<p>Login successful! One moment please...</p>');
      setTimeout(function() {
        location.reload();
      }, 1000);
    } else {
      $(form).find('button').before('<p class="alert">Invalid username or password. Please try again.</p>');
    }
  })
});
