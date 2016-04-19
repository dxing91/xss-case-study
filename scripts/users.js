$.get('/current-username', function(username) {
  $('.logged-in').text('Currently logged in as ' + username + '.');
});

//get users list
$.get('/users-list', function(usernames) {
  var username, listItem, list = [];
  for (var i = 0, x = usernames.length; i < x; i++) {
    username = usernames[i];
    listItem = '<li class="list-group-item"><a href="/profile/' + username + '">' + username + '</a></li>';
    list.push(listItem);
  }
  $('.users-list').append(list);
});
