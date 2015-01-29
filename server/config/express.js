var express = require('express'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');


//config is an object that among other things contains the root path

module.exports = function(app, config) {
    //compile function for middleware (stylus):
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    //setting up stylus
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

    app.use(express.static(config.rootPath + '/public'));
    //cookies are needed for session - add cookie parser before body parser
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //this next line is deprecated
    app.use(session({secret:'multi vision unicorns', resave:false, saveUninitialized:false}));
    //at this point we can initialize passport for authentication
    app.use(passport.initialize());
    //and finally, we're using sessions in our implementation
    app.use(passport.session());
}
