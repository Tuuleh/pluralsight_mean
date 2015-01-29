var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

    //we've added a chain of middleware to the app.get call here, which is Express's way
    //to make sure the page can be viewed only by users who are logged in and authorised
    //so we have TWO handling functions, and if next never gets called in the first one, 
    //it does not continue to the second one

    //it got cluttered, so we moved the first function, which checks if the user is logged in,
    //into the auth module. That func is auth.requiresApiLogin. Express itself will invoke it,
    //so we just pass in the function without calling it.
    app.get('/api/users', auth.requiresApiLogin, auth.requiresRole('admin'), function(req, res) {
        User.find({}).exec(function(err, collection) {
            //we get the entire collection of users from the db, and send that as a response
            res.send(collection);
        });
    });

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

//we're using passport through na XHR post - this is a bit different from your typical
//server side use with a form. this is why we have to tell it explicitly to login (req.logIn(user, callback))
    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        //normally you'd redirect on the server, but since our client is handling all the views, 
        //there's no point in redirecting here
        res.end();
    });

    app.get('*', function(req, res) {
        //sends the current user to the client upon new page request
        res.render('index', {bootstrappedUser: req.user});
    });


}

