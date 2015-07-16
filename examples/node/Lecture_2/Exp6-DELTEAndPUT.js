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

app.route('/dog')
  .all(parseUrlencoded)
  .post(function(request, response){
    var data = request.body;
    var newDog = new Dog(data.name);

    dogs.push(newDog);

    response.status(201).send('Dog added! Brian loved it.');
  })
  .put(function(request, response){
    var dog = request.body;
    for(var x = dogs.length - 1; x >= 0; x--) {
      if(dogs[x].getName() === dog.name) {
        dogs[x].setName(dog.newName);
      }
    }

    response.sendStatus(200);
  });

app.route('/dog/:doggyId')
  .delete(parseUrlencoded, function(request, response){
    var doggyId = request.params.doggyId;

    if(doggyId && doggyId < dogs.length){
      var dog = dogs.splice(doggyId, 1)[0];

      response.json(dog);
    } else {
      response.sendStatus(401);
    }
  });

app.route('/goodDog/:doggyId')
  .get(function(request, response) {
    var doggyIndex = request.params.doggyId;
    if(doggyIndex && doggyIndex < dogs.length) {
      response.send(dogs[doggyIndex].whoIsAGoodBoy());
    } else {
      response.sendStatus(401);
    }
  });

app.route('/wiggle/:doggyId')
  .get(function(request, response) {
    var doggyIndex = request.params.doggyId;
    if(doggyIndex && doggyIndex < dogs.length) {
      response.send(dogs[doggyIndex].wiggle());
    }
  });

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});
