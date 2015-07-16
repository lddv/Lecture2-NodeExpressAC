var express = require('express');
var Dog = require('./Dog');
var app = express();
var dogs = [
  new Dog('Brian'),
  new Dog('Tina Turner'),
  new Dog('Puppy 1'),
  new Dog('Puppy 2'),
  new Dog('Puppy 3')
];

app.get('/goodDog/:doggyId', function(request, response) {
  var doggyIndex = request.params.doggyId;
  if(doggyIndex && doggyIndex < dogs.length) {
    response.send(dogs[doggyIndex].whoIsAGoodBoy());
  } else {
    response.sendStatus(403);
  }
});

app.get('/wiggle/:doggyId', function(request, response) {
  var doggyIndex = request.params.doggyId;
  if(doggyIndex && doggyIndex < dogs.length) {
    response.send(dogs[doggyIndex].wiggle());
  } else {
    response.sendStatus(403);
  }
});

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});
