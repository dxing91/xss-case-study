//search results
$('form').on('submit', function(event) {
  event.preventDefault();
  $('.results').remove();
  var search = $('input[name=search]').val();

  $.get('/users-list', function(users) {
    var userFind = users.indexOf(search);
    if (userFind > -1) {
      results = '<li class="list-group-item results"><a href="/profile/' + search + '">' + search + '</a></li>';
    } else {
      results = '<li class="list-group-item results">User "' + search + '" not found.</li>';
    }
    $('.search-results').before('<p class="results">Results</p>').append(results);
  });
});
