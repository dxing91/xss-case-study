//get my profile details
var username = window.location.pathname.replace('/profile/', '');

$.get('/user-data/' + username, function(user) {
  var userProfile = [];
  var userProfileItems;

  for (var key in user) {
    userProfileItems = key + ':<br><input type="text" class="form-control" name="' + key + '" value="' + user[key] + '"  required><br>';
    userProfile.push(userProfileItems);
  }
  userProfile.pop();
  userProfile.push('Password:<br><input type="password" class="form-control password" name="password" required><br>');
  userProfile.push('Confirm Password:<br><input type="password" class="form-control confirm-password" required><br>');
  userProfile.push('<button type="submit" class="btn btn-default">Update</button>');
  $('.user-profile').append(userProfile);
});

//update my profile details
$('.user-profile').on('submit', function(event) {
  event.preventDefault();
  $('.alert').remove();
  var form = $(this);
  var password = $('.password').val();
  var confirmPassword = $('.confirm-password').val();
  if (password != confirmPassword) {
    $(this).find('button').before('<p class="alert">Passwords do not match.</p>');
    return false;
  }
  var user = form.serialize();

  $.ajax({
    type: 'POST', url: '/user-update', data: user
  }).done(function() {
    $(form).find('button').after('<p class="alert">User details have been updated.</p>');
  });
});
