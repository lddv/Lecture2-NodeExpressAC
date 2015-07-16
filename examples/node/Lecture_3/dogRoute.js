var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extend: false});
var express = require('express');
var router = express.Router();
var dogs = require('./dogs');
var Dog = require('./Dog');

router.route('/')
  .post(parseUrlencoded, function(request, response){
    var data = request.body;
    var newDog = new Dog(data.name);

    dogs.push(newDog);

    response.status(201).send('Dog added! Brian loved it.');
  })
  .put(parseUrlencoded, function(request, response){
    var dog = request.body;
    for(var x = dogs.length - 1; x >= 0; x--) {
      if(dogs[x].getName() === dog.name) {
        dogs[x].setName(dog.newName);
      }
    }

    response.sendStatus(200);
  });

router.route('/:doggyId')
  .delete(parseUrlencoded, function(request, response){
    var doggyId = request.params.doggyId;

    var dog = dogs.splice(doggyId, 1)[0];

    response.json(dog);
  });

module.exports = router;