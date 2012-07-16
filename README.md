A basic Node.js stack
==================

This stack is for starting a basic node.js site.  It is built and tested on Windows using IISNode but could equally be used as a standalone node site. 

##What's in it?

- Web Framework
- Configuration
- Logging
- Email
- Data storage

**Web Framework with Express**

- [Express] (https://github.com/visionmedia/express)
- [http://expressjs.com] (http://expressjs.com)

I am using Vision Media's Express framework to deliver the test results to a browser.  
 
This is a basic stack and does not use Jade or any other templating system to return content.  You can add in any templating framework and build on this base stack.
 
 
**Configuration**
 
- [nConf] (https://github.com/flatiron/nconf)

nConf is Flatiron's configuration module.  I am calling the config.json file in the root of the site to get settings for the logging, email and mongo tests.

```js
var nconf = require('nconf');
nconf.argv()
       .env()
       .file({ file: 'config.json' });
```

*Note: Before running the stack locally you must reset the values in the config.json file to contain your own email and mongo settings.*

**Logging**
 
 - [Winston] (https://github.com/flatiron/winston) 
 
Winston is part of the flatiron node.js stack.  I am using two transports, Mongodb and Mail:

```js
//add winston mongo db
var WinstonMongoDb = require('winston-mongodb').MongoDB;
//add winston mail
var winstonMail = require('winston-mail').Mail;
```

The settings for both are managed in the config.json file.

The MongoDb transport is set to warn and error whilst the mail is only used on error. Therefore logging is done to a database and for extream errors to an email address.

I am not using multiple loggers but have set the transports up under a logger so that it can be passed to other files in the application.  You can see this in the tests/email and tests/mongo files.

Testing for the three Winston message types is done on the URL's
- /winston for info message test
- /winston/warn for warning message test
- /winson/error for error message test

**Email**

- [Emailjs] (https://github.com/eleith/emailjs)
 
I am using the configuration to build both the email server and the test email.

```js 
var server = email.server.connect(nconf.get('EmailServer'));
```

```js 
server.send(nconf.get("EmailTest"), function (err, message) 
```

The logger is also used to log the results.

**Data Storage**

- [MongoDb] (http://www.mongodb.org/)
- [Native MongoDb] (https://github.com/mongodb/node-mongodb-native)
- [Mongoskin] (https://github.com/kissjs/node-mongoskin)

If you don't know what Mongo DB is then you will need to go and find out at [MongoDb] (http://www.mongodb.org/), install the database and get it up and running.  I am also using the free version of [MongoVUE] (http://www.mongovue.com/) to read the collections and documents.

The tests/mongo file contains a small test to add a document to a collection using Mongoskin and read the first item in a collection.  I am using the configuration to store the connection string.

```js 
db.collection('Test').insert({name: "Test Name"}, function(err, result) {
```

The logger is also used to log the results.

##Installing and running

**Prerequisites**

- [Node.js] (http://nodejs.org/)
- [MongoDb] (http://www.mongodb.org/)

**Optional**

- [IISnode] (https://github.com/tjanczuk/iisnode/)
- [WebMatrix] (http://www.microsoft.com/web/webmatrix)
- [IIS Express 7.x] (http://go.microsoft.com/?linkid=9784329)

**Running Steps**

- Setup GMail account to send mails to and from
- Update config.json with your details
- Start Mongo
- Open Folder in Webmatrix
- Run and test

*Note: you can use /api.js/debug to debug the application in Chrome or any other webkit browser.  Remember to use ?kill to stop debugging, see [IISnode] (https://github.com/tjanczuk/iisnode/) for more details on debuging.*

-----------------
Enjoy, Pete.