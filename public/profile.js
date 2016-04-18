//profile pages
if (window.location.search) {
  var username = window.location.search.replace('?username=', '');
  var profileQueryUrl = '/profile/' + username;

  $.get(profileQueryUrl, function(details) {
    var userDetails = details[0];
    var profile = [];
    var profileContent;
    var cookieID = getCookieID();

    if (cookieID && cookieID === userDetails.username) {
      $('.profile-nav').removeClass('active');
      $('.my-profile-nav').addClass('active');
      for (var key in userDetails) {
        profileContent = key + ':<br><input type="text" class="form-control" name="' + key + '" value="' + userDetails[key] + '"  required><br>';
        profile.push(profileContent);
      }
      profile.push('<button type="submit" class="btn btn-default">Update</button>');
      $('.user-profile').hide();
      $('.my-profile').append(profile);
    } else {
      for (var key in userDetails) {
        profileContent = '<li class="list-group-item">' + key + ': ' + userDetails[key] + '</li>';
        profile.push(profileContent);
      }
      profile.splice(5,2);
      $('.my-profile').hide();
      $('.user-profile').append(profile);
    }
  });
}

//my profile update
$('.my-profile').on('submit', function(event) {
  event.preventDefault();
  $('.alert').remove();
  var form = $(this);
  var password = $('input[name=password]').val();
  var confirmPassword = $('input[name=confirm-password]').val();
  if (password != confirmPassword) {
    $(this).find('button').before('<p class="alert">Passwords do not match.</p>');
    return false;
  }
  var userData = form.serialize();

  $.ajax({
    type: 'POST', url: '/user-update', data: userData
  }).done(function() {
    $(form).find('button').after('<p class="alert">User details have been updated.</p>');
  });
});
