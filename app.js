var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var users = [ { 'name': 'Yang', 'username': 'wootez', 'age': '25', 'sex': 'male', 'phone': '123', 'password': 'hello' },
              { 'name': 'Nick', 'username': 'nickiminaj', 'age': '25', 'sex': 'male', 'phone': '456', 'password': 'goodbye' } ];

var sessionDB = {};
var sessionIterator = 1;

//middleware
app.use(express.static('scripts'));
app.use(cookieParser());

//pages
app.get('/', function(request, response) {
  if (request.cookies.sessionID) {
    response.sendFile(__dirname + '/public/home.html');
  } else {
    response.sendFile(__dirname + '/public/index.html');
  }
});

app.get('/users', function(request, response) {
  response.sendFile(__dirname + '/public/users.html');
});

app.get('/search', function(request, response) {
  response.sendFile(__dirname + '/public/search.html');
});

app.get('/register', function(request, response) {
  response.sendFile(__dirname + '/public/register.html');
})

//account requests
app.post('/login', parseUrlencoded, function(request, response) {
  var user = request.body;
  var userFind = users.filter(function (obj) {
    return obj.username === user.username;
  })[0];
  if ( userFind && userFind.password === user.password ) {
    var sessionID = 'sessionID' + sessionIterator;
    sessionDB[sessionID] = user.username;
    sessionIterator++;
    response.cookie('sessionID', sessionID, {encode: data => data}).json(user);
  } else {
    response.end();
  }
});

app.get('/logout', function(request, response) {
  response.clearCookie('sessionID').redirect('/');
});

app.get('/current-name', function(request, response) {
    var username = sessionDB[request.cookies.sessionID];
    var name = users.filter(function (obj) {
      return obj.username === username;
    })[0].name;
    response.json(name);
});
app.get('/current-username', function(request, response) {
  if (request.cookies.sessionID) {
    var username = sessionDB[request.cookies.sessionID];
    response.json(username);
  } else {
    response.end();
  }
});

//users page request
app.route('/users-list')
  .get(function(request, response) {
    var usernames = users.map(function(user) {
                      return user.username;
                    });
    response.json(usernames);
  })
  .post(parseUrlencoded, function (request, response) {
    var user = request.body;
    var username = user.username;
    var userExist = users.filter(function (obj) {
      return obj.username === username;
    })[0];
    if (!userExist) {
      users.push(user);
      response.json(username);
    } else {
      response.end();
    }
  });

//profile page requests
app.get('/profile/:username', function (request, response) {
  var sessionID = request.cookies.sessionID;
  var username = sessionDB[sessionID];

  if (username === request.params.username) {
    response.sendFile(__dirname +  '/public/edit-profile.html');
  } else {
    response.sendFile(__dirname + '/public/profile.html');
  }
});

app.get('/user-data/:username', function(request, response) {
  var user = users.filter(function(obj) {
    return obj.username === request.params.username;
  })[0];
  response.json(user);
});

app.post('/user-update', parseUrlencoded, function(request, response) {
  var sessionID = request.cookies.sessionID;
  var username = sessionDB[sessionID];
  var userFind = users.filter(function(obj) {
    return obj.username === username;
  })[0];
  var user = request.body;
  users[users.indexOf(userFind)] = user;
  sessionDB[sessionID] = user.username;
  response.sendStatus(201);
});

//port 3000
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
