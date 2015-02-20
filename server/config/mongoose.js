var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');

module.exports = function(config) {
    mongoose.connect(config.mongoConnectionString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log("db opened.");
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
}

//this was an example on how to extract a message from the mongoDB
// var messageSchema = mongoose.Schema({message: String});
// var message = mongoose.model('Message', messageSchema);
// var mongoMessage;

// message.findOne().exec(function(err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });

