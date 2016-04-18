var cookieID = getCookieID();
if (cookieID) {
  $('.nav').append([ '<li class="my-profile-nav"><a href="/profile.html?username=' + cookieID + '">My Profile</a></li>', '<li class="logout-nav"><a href="/logout">Logout</a></li>' ]);
}

//Cookie check
function getCookieID() {
  var cookieArray = document.cookie.split('; ');
  var cookieUsername;
  for (var i = 0, x = cookieArray.length; i < x; i++) {
    if (cookieArray[i].indexOf('cookieID') === 0) {
      const usernameIndex = cookieArray[i].indexOf('=') + 1;
      cookieUsername = cookieArray[i].slice(usernameIndex);
    }
  }
  return cookieUsername;
};
