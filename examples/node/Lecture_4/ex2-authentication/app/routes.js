var User = require('../app/models/userDAO');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // shows profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // logs out of the app
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // list all users
    app.get('/users', function(req, res) {
        User.listAllUsers(function(users){
            res.send(users);
        });
    });

    // show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login'    // redirect back to the signup page if there is an error
    }));

    // show the signup form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup'   // redirect back to the signup page if there is an error
    }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
