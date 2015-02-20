var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
            //we get the entire collection of users from the db, and send that as a response
        res.send(collection);
    });
}

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encryption.createSalt();
    userData.hashed_pwd = encryption.hashPwd(userData.salt, userData.password);
    console.log(userData);
    //creates a new instance in the mongo db
    User.create(userData, function(err, user) {
        //first we catch the duplicate user ID scenario
        if(err) {
            console.log('shite, error')
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            //we return the error back as the reason param of an object because 
            //we use that in the $q promise.
            return res.send({reason: err.toString()});
        }
        req.logIn(user, function(err) {
            console.log('logging in')
            if(err) {return next(err);}
            res.send(user);
        });
    });
}

exports.updateUser = function(req, res) {
    var userUpdates = req.body;
    //check that the added user is the same one as is logged in, or an admin
    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;

    if(userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encryption.createSalt();
        req.user.hashed_pwd = encryption.hashPwd(req.user.salt, req.user.password);
    }

    req.user.save(function(err) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('A person with that email already exists.');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        //no error - respond with updated user values
        res.send(req.user);
    })
}