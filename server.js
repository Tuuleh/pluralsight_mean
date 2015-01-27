var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//compile function for middleware (stylus):

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//setting up stylus
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/pluralsight');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log("pluralsight db opened");
});

var messageSchema = mongoose.Schema({message: String});
var message = mongoose.model('Message', messageSchema);
var mongoMessage;

message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});

//: specifies a space holder - partialPath
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});


app.listen(process.env.PORT || 3000);
console.log('listening on port ' + process.env.PORT)