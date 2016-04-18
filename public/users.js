//users list
$.get('/user-list', function(users) {
  var list = [];
  var username, content;
  for (var i in users) {
    username = users[i].username;
    content = '<li class="list-group-item"><a href="/profile.html?username=' + username + '">' + username + '</a></li>'
    list.push(content);
  }
  $('.user-list').append(list);
});
