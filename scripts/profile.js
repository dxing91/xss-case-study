//get others' profile details
var username = window.location.pathname.replace('/profile/', '');

$.get('/user-data/' + username, function(user) {
  console.log(user);
  var userProfile = [];
  var userProfileItems;

  for (var key in user) {
    userProfileItems = '<li class="list-group-item">' + key + ': ' + user[key] + '</li>';
    userProfile.push(userProfileItems);
  }
  userProfile.splice(5,1);
  $('.user-profile').append(userProfile);
});
