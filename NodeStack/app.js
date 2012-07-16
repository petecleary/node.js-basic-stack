
//require express
var express = require('express');
//create express server
var app = express.createServer();

//require nconf config settings
var nconf = require('nconf');
nconf.argv()
       .env()
       .file({ file: 'config.json' });
    
//require winston for logging
var winston = require('winston');
//add winston mongo db
var WinstonMongoDb = require('winston-mongodb').MongoDB;
//add winston mail
var winstonMail = require('winston-mail').Mail;
//add them to winton as a logger
winston.loggers.add('log',{
    transports: [
      new (WinstonMongoDb)(nconf.get('WinstonMongoDb')),
      new (winstonMail)(nconf.get('WinstonEmail'))
    ]
  });
//set the logger
var logger = winston.loggers.get('log');
//add in exception handler to write to file
logger.handleExceptions(new winston.transports.File({ filename: 'logs/exceptions.log' }))

//add root page
app.get('/', function (req, res) {
    res.send("<h1>Starter Stack</h1><ul><li><a href='winston'>Winston Info Message</a></li><li><a href='winston/warn'>Winston Warning Message</a></li><li><a href='winston/error'>Winston Error Message</a></li><li><a href='email'>Email Test</a></li><li><a href='mongo'>MongoDb Find</a></li><li><a href='mongo/add'>MongoDb Add</a></li></ul>");
});

//do winston log info
app.get('/winston', function (req, res) {
    logger.info("Winston Info message", {anything: 'This is metadata too!'});
    res.send("<h1>Starter Stack</h1><p>Winston INFO message</p><a href='/'>Home</a>");
});

//do winston log warning
app.get('/winston/warn', function (req, res) {
    logger.warn("Winston Warning message", {anything: 'This is metadata too!'});
    res.send("<h1>Starter Stack</h1><p>Winston WARNING message</p><a href='/'>Home</a>");
});

//do winston log error
app.get('/winston/error', function (req, res) {
    logger.error("Winston Error message", {anything: 'This is metadata too!'});
    res.send("<h1>Starter Stack</h1><p>Winston ERROR message</p><a href='/'>Home</a>");
});

//require the email test script
var email = require('./tests/email.js');
//call the send email test
app.get('/email', function (req, res) {
    email.send(res);    
});

//require the email test script
var mongo = require('./tests/mongodb.js');
//call the mongo find test
app.get('/mongo', function (req, res) {
    mongo.find(res);    
});

//call the mongo add test
app.get('/mongo/add', function (req, res) {
    mongo.add(res);    
});

//start app on process port or 8080
app.listen(process.env.PORT || 8080);
//log server start
console.log('Server created: node version ' + process.version);
