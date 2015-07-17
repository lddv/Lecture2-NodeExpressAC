var express = require('express');
var app = express();
var dogRoute = require('./dogRoute');
var goodDogRoute = require('./goodDogRoute');
var wiggleRoute = require('./wiggleRoute');

app.get('/', function(req, res){
  res.send('<img src="http://www.glamourparis.com/uploads/images/thumbs/201149/this_is_dog_126702172_north_607x.jpg">')
});
app.use('/dog', dogRoute);
app.use('/goodDog', goodDogRoute);
app.use('/wiggle', wiggleRoute);


app.listen(process.env.PORT || 8080);