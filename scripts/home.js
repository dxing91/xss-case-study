$.get('/current-username', function(username) {
  $('.welcome-message').text('Welcome back, ' + username + '!');
  $('.profile-link').attr('href', '/profile/' + username);
});
