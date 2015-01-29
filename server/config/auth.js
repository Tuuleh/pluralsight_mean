var passport = require('passport');

exports.authenticate = function(req, res, next) {
        // auth = authentication function
    var auth = passport.authenticate('local', function(err, user) {
        if(err) {
            return next(err)
        }
        if(!user) {
            //sends a json object to the client with a message that we failed to authenticate the user
            res.send({success:false})
        }
        //since all other outcomes have been cleared before this function, if neither of these
        //conditions is truem the user has been found and identified, and the following is called:
        req.logIn(user, function(err) {
            if(err) {
                return next(err);                   
            }
            res.send({success:true, user:user});
        })
    });
    //function that gets created with the authentication
    auth(req, res, next);
}

//a func for checking if user is logged in when requesting API page
exports.requiresApiLogin = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    }
    else {
       next(); 
    }
}
//a func for checking if user is an admin when requesting a page
exports.requiresRole = function(role) {
    return function(req, res, next) {
        if(!req.isAuthenticated() || req.user.roles.indexOf(role)===-1) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    }
}