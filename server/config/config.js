//path module used to normalize root path
var path = require('path');
var rootPath = path.normalize(__dirname + "/../../");
var dbPassword = require('./db_password');

module.exports = {
    development : {
        rootPath: rootPath,
        mongoConnectionString: 'mongodb://localhost/pluralsight',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        mongoConnectionString: 'mongodb://tuuli:'+dbPassword+'@ds039421.mongolab.com:39421/multivision',
        port: process.env.PORT || 80
    }
}