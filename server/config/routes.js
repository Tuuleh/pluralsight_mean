var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    //controllers for users and courses (between the site and the db)
    users = require('../controllers/users'),
    courses = require('../controllers/courses');

module.exports = function(app) {

    //we've added a chain of middleware to the app.get call here, which is Express's way
    //to make sure the page can be viewed only by users who are logged in and authorised
    //so we have TWO handling functions, and if next never gets called in the first one, 
    //it does not continue to the second one.Express itself will invoke it,
    //so we just pass in the function without calling it.

    app.get('/api/users', auth.requiresApiLogin, auth.requiresRole('admin'), users.getUsers);

    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCoursesById);

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

    app.all('/api/*', function(req, res) {
        res.send(404);
    })

    app.get('*', function(req, res) {
        //sends the current user to the client upon new page request
        res.render('index', {bootstrappedUser: req.user});
    });


}

