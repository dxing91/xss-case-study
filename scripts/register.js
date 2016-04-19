//register
$('.register-form').on('submit', function(event) {
  event.preventDefault();
  $('.alert').remove();
  var form = $(this);
  var password = $('.register-password').val();
  var confirmPassword = $('.register-confirm-password').val();
  if (password != confirmPassword) {
    $(form).find('button').after('<p class="alert">Passwords do not match.</p>');
    return false;
  }
  var user = form.serialize();
  console.log(user);

  $.ajax({
    type: 'POST', url: '/users-list', data: user
  }).done(function(username) {
    if (username) {
      $('.alert').remove();
      $(form).find('button').after('<p class="alert">New user "' + username + '" has been created. Please click <a href="/">here</a> to log in.</p>');
      form.trigger('reset');
    } else {
      $(form).find('button').after('<p class="alert">That username already exists!</p>');
    }
  });
});
