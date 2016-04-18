//search results
$('form').on('submit', function(event) {
  event.preventDefault();
  $('.results').remove();
  var username = $('input[name=search]').val();

  $.get('/user-list', function(users) {
    var userFind = users.filter(function (obj) {
      return obj.username === username;
    })[0];
    if (userFind) {
      results = '<li class="list-group-item results"><a href="/profile.html?username=' + username + '">' + username + '</a></li>';
    } else {
      results = '<li class="list-group-item results">User "' + username + '" not found.</li>';
    }
    $('.search-results').before('<p class="results">Results</p>').append(results);
  });
});
