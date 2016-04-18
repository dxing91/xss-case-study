var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var users = [ { 'name': 'yang', 'username': 'wootez', 'age': '25', 'sex': 'male', 'phone': '123' },
              { 'name': 'nick', 'username': 'poo', 'age': '25', 'sex': 'male', 'phone': '456'} ];

app.use(express.static('public'));

app.get('/user-list', function (request, response) {
  response.json(users);
});

app.post('/user-list', parseUrlencoded, function (request, response) {
  var newUser = request.body;
  users.push(newUser);
  response.status(201).json(newUser.username);
});

app.get('/profile/:username', function (request, response) {
  var userDetails = users.filter(function (obj) {
    return obj.username === request.params.username;
  });
  response.json(userDetails);
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
