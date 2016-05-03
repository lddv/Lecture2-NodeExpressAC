// http://tmeloliveira.github.io/acbook-nodejs/lecture2.html
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extend: false});
var path = require('path');
var express = require('express');
var app = express();

var dao = require("./userDAO.js");

app.use(express.static(path.join(__dirname, 'public')));

app.route('/users')
  .get(function(request, response){
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
  })
  .post(parseUrlencoded, function(request, response){
    var data = request.body;
    if(data){
      dao.createUser(data,
        function success(data) { console.log('Hi, I am new here! My name is ', data); },
        function failure() { console.log('Could not create user!'); }
      );

      response.status(201).send('User added!');
    } else {
      response.sendStatus(403);
    }
  });

app.route('/users/:userId')
  .get(function(request, response){
    var userId = request.params.userId;
    dao.getUser(userId,
      function(results){
        response.send(results);
      },
      function(){
        response.status(403).send([]);
      });
  })
  .delete(parseUrlencoded, function(request, response){
    var userId = request.params.userId;
    var deletedUser = dao.deleteUser(userId, function(request, response){
        console.log('deletedUser:', request);
      },
      function(){
        console.log('Unable to delete user with ID:', userId);
      }
    );
    response.status(204).send(deletedUser);
  });

app.route('/users/password/:userId')
  .put(parseUrlencoded, function(request, response){
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
