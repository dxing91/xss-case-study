var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var users = [ { 'name': 'yang', 'username': 'wootez', 'age': '25', 'sex': 'male', 'phone': '123', 'password': 'hello', 'confirm-password': 'hello' },
              { 'name': 'nick', 'username': 'poo', 'age': '25', 'sex': 'male', 'phone': '456', 'password': 'goodbye', 'confirm-password': 'goodbye' } ];

var cookieDB = {};
var cookieIterator = 1;
var cookieID = 'cookieID' + cookieIterator;

app.use(express.static('public'));
app.use(cookieParser());

app.get('/profile/:username', function (request, response) {
  var userDetails = users.filter(function (obj) {
    return obj.username === request.params.username;
  });
  response.json(userDetails);
});

app.get('/logout', function (request, response) {
  var cookies = request.cookies;
  for (var key in cookies) {
    if (key.indexOf('cookieID') === 0) {
      response.clearCookie(key).redirect('/');
    }
  }
});

app.post('/login', parseUrlencoded, function (request, response) {
  var user = request.body;
  var userFind = users.filter(function (obj) {
    return obj.username === user.username;
  })[0];
  if ( userFind && userFind.password === user.password ) {
    cookieDB[cookieID] = user.username;
    cookieIterator++;
    response.cookie(cookieID, user.username, {encode: data => data}).json(user);
  } else {
    response.end();
  }
});

app.post('/user-update', parseUrlencoded, function (request, response) {
  var user = request.body;
  var cookies = request.cookies;
  var username, cookie;
  for (var key in cookies) {
    if (key.indexOf('cookieID') === 0) {
      cookie = key;
      username = cookies[key];
    }
  }
  var userFind = users.filter(function(obj) {
    return obj.username === username;
  })[0];
  users[users.indexOf(userFind)] = user;
  response.clearCookie(cookie).cookie(cookieID, user.username, {encode: data => data}).sendStatus(201);
});

app.route('/user-list')
  .get(function (request, response) {
    response.json(users);
  })
  .post(parseUrlencoded, function (request, response) {
    var newUser = request.body;
    var userFind = users.filter(function (obj) {
      return obj.username === newUser.username;
    })[0];
    if (!userFind) {
      users.push(newUser);
      response.status(201).json(newUser);
    } else {
      response.send(null);
    }
  });

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
