var serverObject = require('../src/server'),
  request = require('supertest'),
  should = require('should'),
  dogData = {
    name: 'testDog'
  },
  updateDog = {
    name: dogData.name,
    newName: 'testDog2'
  };

describe('Dog Service', function() {
  var server;
  var url = 'http://localhost:8080';
  request = request(url);

  before(function (done) {
    server = serverObject.makeServer(done);
  });

  after(function (done) {
    server.close(done);
  });

  it('should create a dog', function(done){
    request.post('/dog')
      .send(dogData)
      .expect(201, done);
  });

  it('should update the test dog', function(done){
    request.put('/dog')
      .send(updateDog)
      .expect(200, done);
  });

  it('should delete the first dog', function(done){
    request.delete('/dog/0')
      .expect(200)
      .end(function(error, response){
        if(error) return done(error);

        var dog = response.body;
        dog.should.not.be.empty;

        done();
      });
  });

  it('should wiggle the first dog\'s tail', function(done){
    request.get('/wiggle/0')
      .expect(200)
      .end(function(error, response){
        if(error) return done(error);

        var dogWiggle = response.body;
        dogWiggle.should.not.be.empty;
        dogWiggle.should.be.an.instanceOf(String);
        done()
      });
  });

  it('should say that the first dog is a good dog', function(done){
    request.get('/goodDog/0')
      .expect(200)
      .end(function(error, response){
        if(error) return done(error);

        var goodDog = response.body;
        goodDog.should.not.be.empty;
        goodDog.should.be.an.instanceOf(String);
        done();
      });
  });
});