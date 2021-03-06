"use strict";

var aws = require('aws-sdk');
var async = require('async');
var msg = require('node-red-aws-msg');

//var func = require('./func.js');

var lambda = new aws.Lambda();

exports.handler = function(event, context, callback) {
	console.log('Event: ' + JSON.stringify(event, null, 2));
	
	var nodes = msg.parse(event);

	async.each(nodes, function(node, asyncCallback) {

		var params = {
		  Code: { /* required */
		    ZipFile: 'func.toString()'
		  },
		  FunctionName: node.name, /* required */
		  Handler: 'index.handler', /* required */
		  Role: 'lambda_basic_execution', /* required */
		  Runtime: 'nodejs4.3', /* required */
		  Description: 'teste',
		  MemorySize: 128,
		  Publish: true,
		  Timeout: 30
		};

		lambda.createFunction(params, function(err, data) {
		  asyncCallback(err,data);
		});

	}, function(err) {

		if (err) {
			msg.error(err, callback);
		} else {
			callback(err, 'Done.');	
		}

	})

}



