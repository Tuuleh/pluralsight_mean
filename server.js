var express = require('express');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

//the configuration variable with the root path name that gets passed into express configuration below
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);
console.log('listening on port ' + config.port);