/*
var https = require('https');
var fs = require("fs");

var options = {
	host: 'localhost',
	port: 8000,
	path: '/',
	method: 'GET',
	key: fs.readFileSync("keys/userB.key"),
	cert: fs.readFileSync("certs/userB.crt"),
	ca: fs.readFileSync("ca/ca.crt")
};

var req = https.request(options, function(res) {
	console.log("statusCode:"+res.statusCode);
	console.log("headers:"+res.headers);

	res.on('data', function(d) {
    	process.stdout.write(d);
  	});
});

req.end();

req.on('error', function(e) {
	console.error(e);
});
*/

var https = require('https'),                  // Module for https
    fs =    require('fs');                     // Required to read certs and keys

var options = {
    key:   fs.readFileSync('keys/userB.key'),  // Secret client key
    cert:  fs.readFileSync('certs/userB.crt'),  // Public client 
    ca: fs.readFileSync("ca/ca.crt"),
    rejectUnauthorized: false,              // Used for self signed server
    host: "localhost",                    // Server hostname
    port: 8000                                 // Server port
};

callback = function(response) {
  var str = '';    
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

https.request(options, callback).end();