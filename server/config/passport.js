var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');


module.exports = function() {
    //defines local authentication strategy for passport
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({username:username}).exec(function(err, user) {
                if(user && user.authenticate(password)) {
                    //calls 'done' callback with null for the error and user for the user
                    done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function(user,done) {
        if(user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id,done) {
        User.findOne({_id:id}).exec(function(err, user) {
            if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
}
