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

app.listen(8989, function(){
  console.log('Listening on port 8989...');
});
