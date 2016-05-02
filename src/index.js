var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extend: false});
var path = require('path');
var express = require('express');
var app = express();

// Exercise 2:
// Using the same server from Exercise 1 change the GET route to return the user's list.
// This route should expect a query string that can come empty or not.
// This query string should be named "q" and will be used to search users by name.
// If there is no query string you should return the whole list.
// Example: http://localhost:8989/?q=test
var dao = require("./userDAO.js");

app.get('/', function(request, response){
  var messageIndex = request.query.q;
  if (messageIndex && messageIndex.length > 0) {
    dao.searchUsersByName(messageIndex, function(results){
      response.send(results);
    });
  } else {
    dao.listAllUsers(function(users){
      response.send(users);
    });
  }
});

// Exercise 3:
// Using the same server from Exercise 1 create a POST route that creates a
// user. The data will come from a form action. You should validate you data,
// it should exist. If it does not the request should fail.
// This route's path should be "localhost:3000/users"
app.post('/users', parseUrlencoded, function(request, response){
  var data = request.body;
  if(data){
    var newUser = new dao.createUser(data, function success(data) {
      console.log('Oi, eu sou novo aqui! Meu nome é ', data);
    });

    response.status(201).send('User added!');
  } else {
    response.sendStatus(403);
  }
});

app.listen(8989, function(){
  console.log('Listening on port 8989...');
});
