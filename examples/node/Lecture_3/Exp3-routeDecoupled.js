var express = require('express');
var app = express();
var dogRoute = require('./dogRoute');
var goodDogRoute = require('./goodDogRoute');
var wiggleRoute = require('./wiggleRoute');

app.use('/dog', dogRoute);
app.use('/goodDog', goodDogRoute);
app.use('/wiggle', wiggleRoute);

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});