$(function() {

  $.get('/user-list', appendToList);

  $('.register-form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var userData = form.serialize();

    $.ajax({
      type: 'POST', url: '/user-list', data: userData
    }).done(function(username) {
      $(form).find('button').replaceWith('<p>New user ' + username + ' has been created.</p>');
      form.trigger('reset');
    });
  });

  if (window.location.search) {
    var username = window.location.search.replace('?username=', '').replace('?search=', '');
    var url = '/profile/' + username;

    $.get(url, function(details) {
      var userDetails = details[0];
      var profile = [];
      var profileContent;

      for (var key in userDetails) {
        profileContent = key + ': ' + userDetails[key];
        profile.push($('<li>', { text: profileContent }));
      }

      //profile page
      $('.user-profile').append(profile);
      //search results
      var profileLink;
      if (userDetails) {
        profileLink = '<li><a href="/profile.html?username=' + username + '">' + username + '</a></li>'
      } else {
        profileLink = '<li>User not found.</li>'
      }
      $('.search-results').append(profileLink);
    })
  }

  function appendToList(users) {
    var list = [];
    var userName, content;
    for (var i in users) {
      userName = users[i].username;
      content = '<a href="/profile.html?username=' + userName + '">' + userName + '</a>'
      list.push($('<li>', { html: content }));
    }
    $('.user-list').append(list);
  }

});
