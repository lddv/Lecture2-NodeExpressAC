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
// Example: http://localhost:8989/users?q=test
var dao = require("./userDAO.js");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', function(request, response){
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
      console.log('Hi, I am new here! My name is ', data);
    });

    response.status(201).send('User added!');
  } else {
    response.sendStatus(403);
  }
});

// Exercise 4:
// Using the same server from Exercise 1 create a GET dynamic route that get an
// user by ID. This ID will be captured by the path's variable. In case that
// the user does not exist, return an empty object.
// This route's path should be "localhost:3000/users/:userId"
app.get('/users/:userId', function(request, response){
  var userId = request.params.userId;
  dao.getUser(userId,
    function(results){
      response.send(results);
    },
    function(){
      response.status(403).send([]);
    });
});

// Exercise 5:
// Using the same server from Exercise 1 create a DELETE dynamic route that
// delete an user by ID. This ID will be captured by the path's variable.
// This route's path should be "localhost:3000/users/:userId"
app.delete('/users/:userId', function(request, response){

  var data = request.body;
  if(data){
    var newUser = new dao.createUser(data, function success(data) {
      console.log('Hi, I am new here! My name is ', data);
    });

    response.status(201).send('User added!');
  } else {
    response.sendStatus(403);
  }
  var userId = request.params.userId;
  var deletedUser = new dao.deleteUser(userId, function(request, response){
    console.log('You just deleted a user with ID:', userId);
    console.log('request:', request);
    console.log('response:', response);
    // response.sendStatus(204);
  },
  function(){
    console.log('Unable to delete user with ID:', userId);
  });
  console.log(deletedUser);
});

// Exercise 6:
// Using the same server from Exercise 1 create a PUT dynamic route that change
// an user password by ID. This ID will be captured by the path's variable.
// The data will come from a form action. You should validate that, if there is
// missing any data, the request should fail.
// This route's path should be "localhost:3000/users/password/:userId"
app.put('/users/password/:userId', parseUrlencoded, function(request, response){
  var userId = request.params.userId;
  var data = request.body;

  if (data && data._id && data.oldPassword && data.newPassword) {
    dao.changePassword(data,
      function(){
        console.log('trying to fulfill successCB');
        response.status(201).send('Password updated!');
      },
      function(){
        response.status(403).send('Failed to change password!');
      });
  }
});

app.listen(8989, function(){
  console.log('Listening on port 8989...');
});
