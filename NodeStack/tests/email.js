//add winston to log
var winston = require('winston');
//require config
var nconf = require('nconf');
//require emailjs
var email = require("emailjs/email");

//build server from nconf Email settins
var server = email.server.connect(nconf.get('EmailServer'));

//send email test
var send = exports.send = function (res) {     
    // send the message and get a callback with an error or details of the message that was sent
    server.send(nconf.get("EmailTest"), function (err, message) 
    { 
        var logger = winston.loggers.get('log');
        if(err != null){
            logger.error("Email error", {emailErr: err, emailMessage: message});
            res.send("<h1>Starter Stack</h1><p>" + "Email error!</p><a href='/'>Home</a>");
        }
        else
        {
            logger.warn("Email sent to " + message.header.to, {emailErr: err, emailMessage: message});            
            res.send("<h1>Starter Stack</h1><p>Email sent to " + message.header.to + "</p><a href='/'>Home</a>");
        }
    });
}
