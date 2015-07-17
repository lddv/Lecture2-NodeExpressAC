// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

// load up the user model
var User = require('../app/models/userDAO');

module.exports = function(passport) {

    // passport session setup 
    // required for persistent login sessions

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        User.searchUsersByName(email, function(user){
            done(null, user);
        })
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },

    function(req, email, password, done) {

        var successCB = function(usuario){
            done(null, usuario);
        }

        var failCB = function(msg){
            console.log(msg);
            done(null, false);   
        }

        // asynchronous
        process.nextTick(function(){
            var userData = {
                name: req.body.name,
                password: password,
                email: email
            }
            User.getUserByEmailAndPassword(userData, successCB, failCB);
        });

    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                // If the user exists
                var successCB = function(user){
                    done(null, false);
                    console.log('Esse usuário ja existe!');
                }

                // If the user doesn't exist, create it!
                var failCB = function(){
                    var userData = {
                        name: req.body.name,
                        password: password,
                        email: email
                    }
                    User.createUser(userData, function(user){
                        done(null, user);
                    });
                }
                console.log(email)
                User.searchUsersByName(email, successCB,  failCB);

            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
}));

};
