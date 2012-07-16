// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";
//add winston to log
var winston = require('winston');
//require config
var nconf = require('nconf');
//require mongo skin
var mongo = require('mongoskin');
//create db from ncfon connection string
var db = mongo.db(nconf.get('MongoSkinConnection'));

//add an item to the database
var add = exports.add = function (res) {
    db.collection('Test').insert({name: "Test Name"}, function(err, result) {
        var logger = winston.loggers.get('log');
        if (err) {
            logger.error("MongoDB Test insert error", {mongoErr: err});
            res.send("<h1>Starter Stack</h1><p>MongoDb insert error!</p><a href='/'>Home</a>");
        }
        else
        {
            logger.warn("MongoDB Test inserted " + result.name, {mongoRes: result});
            res.send("<h1>Starter Stack</h1><p>MongoDB Test inserted " + result.name + "</p><a href='/'>Home</a>");
        }
    });
}

//find an item from the database
var find = exports.find = function (res) {
    db.collection('Test').findOne(function (err, item) {
        var logger = winston.loggers.get('log');
        if (err) {
            logger.error("MongoDB Test read error", {mongoErr: err});
            res.send("<h1>Starter Stack</h1><p>MongoDb find error!</p><a href='/'>Home</a>");
        }
        else
        {
            logger.warn("MongoDB Test found: " + item.name, {mongoItem: item});
            res.send("<h1>Starter Stack</h1><p>MongoDB Test found: " + item.name + "</p><a href='/'>Home</a>");
        }
    });
}
