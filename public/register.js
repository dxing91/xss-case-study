//registration
$('.register-form').on('submit', function(event) {
  event.preventDefault();
  $('.alert').remove();
  var form = $(this);
  var password = $('input[name=password]').val();
  var confirmPassword = $('input[name=confirm-password]').val();
  if (password != confirmPassword) {
    $(form).find('button').after('<p class="alert">Passwords do not match.</p>');
    return false;
  }
  var userData = form.serialize();

  $.ajax({
    type: 'POST', url: '/user-list', data: userData
  }).done(function(newUser) {
    if (newUser) {
      $('.alert').remove();
      $(form).find('button').after('<p class="alert">New user "' + newUser.username + '" has been created. Please click <a href="/">here</a> to log in.</p>');
      form.trigger('reset');
    } else {
      $(form).find('button').after('<p class="alert">That username already exists!</p>');
    }
  });
});
