var express = require('express');
var Dog = require('./Dog');
var app = express();
var brian = new Dog('Brian');

app.get('/goodDog', function(request, response) {
  response.send(brian.whoIsAGoodBoy());
});

app.get('/wiggle', function(request, response) {
  response.send(brian.wiggle());
});

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});