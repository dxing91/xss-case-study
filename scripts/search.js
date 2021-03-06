$.get('/current-username', function(username) {
  $('.logged-in').text('Currently logged in as ' + username + '.');
});

//search results
var search = decodeURIComponent(window.location.search.replace('?search=', ''));
if (search) {
  $.get('/users-list', function(users) {
    var userFind = users.indexOf(search);
    if (userFind > -1) {
      results = '<li class="list-group-item results"><a href="/profile/' + search + '">' + search + '</a></li>';
    } else {
      results = '<li class="list-group-item results">User "' + search + '" not found.</li>';
    }
    $('.search-results').before('<p class="results">Results</p>').append(results);
  });
};
