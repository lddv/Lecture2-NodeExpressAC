var express = require('express');
var app = express();

app.use(function(request, response, next){
  var start = new Date();
  var url = request.url;
  var method = request.method;

  response.on('finish', function(){
    var duration = +new Date() - start;
    var message = method +' to '+ url +'\ntook '+ duration +' ms \n\n';
    console.log(message);
  });

  next();
});

app.route('/').get(function(request, response){
  setTimeout(function(){
    response.sendStatus(200);
  }, 5000);
});

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});