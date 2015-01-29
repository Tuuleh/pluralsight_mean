var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.mongoConnectionString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log("db opened.");
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'joe')
            //note that everyone's pwd in plaintext is now 'joe'
            User.create({firstName: "Joe", lastName: "Eames", username: "Joe", salt: salt, hashed_pwd: hash, roles: ['admin']});
            User.create({firstName: "Iggy", lastName: "Kitty", username: "Iggy", salt: salt, hashed_pwd: hash, roles: []});
            User.create({firstName: "Cyrus", lastName: "Spider", username: "Cyrus", salt: salt, hashed_pwd: hash});
        } 
    }) 
}

//this was an example on how to extract a message from the mongoDB
// var messageSchema = mongoose.Schema({message: String});
// var message = mongoose.model('Message', messageSchema);
// var mongoMessage;

// message.findOne().exec(function(err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}