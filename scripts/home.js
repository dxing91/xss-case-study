$.get('/current-username', function(username) {
  $('.logged-in').text('Currently logged in as ' + username + '.');
  $('.profile-link').attr('href', '/profile/' + username);
});

$.get('/current-name', function(name) {
  $('.welcome-message').text('Welcome back, ' + name + '!');
});
