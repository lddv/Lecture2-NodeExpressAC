var express = require('express');
var Dog = require('./Dog');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extend: false});
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

app.post('/dog', parseUrlencoded, function(request, response){
  var data = request.body;
  if(data && data.name){
    var newDog = new Dog(data.name);

    dogs.push(newDog);
    console.log('Oi, meu nome é ', newDog.getName());

    response.status(201).send('Dog added! Brian loved it.');
  } else {
    response.sendStatus(403);
  }
});

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});

