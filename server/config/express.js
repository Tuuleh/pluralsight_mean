var express = require('express'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    logger = require('morgan');


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
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}
