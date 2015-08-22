//var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var normalize = new RegExp(/([^\w\.])/gi);

var readAndSave = function(uri, fileName, callback) {

	var data = '';

	var options = url.parse(uri);
	options.headers = {
		'X-Auth-Token': '97a03c48247f456f8d1d9c8fd7de5ce6'
	};

	http.get(options, function(res) {
		res.on('data', function(chunk) {
			data += chunk;
		}).on('end', function () {
console.log('LOADING ' + data);
console.log(fileName);
			fs.open(fileName, 'w', function (err, fd) {
				if (err) throw err;
				fs.writeFile(fileName, data, function (err) {
					if (err) throw err;
console.log(fileName + ' saved!');
					fs.close(fd);
				});
				if (callback) callback(data);
			});
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
};

exports.loadCache = function loadCache(uri, params) {

	var expireTime = 24 * 60 * 60 * 1000;	// 1 horas

	var config = {
		fileName: path.join(__dirname, (params.saveAs || '../cache/' + uri.replace(normalize, '_'))),
		success: params.success || false
	};

	fs.exists(config.fileName, function (exists) {
		if (exists) {
			var stats = fs.stat(config.fileName, function (err, stats) {
				if (err) throw err;
				var now = new Date();
				if (stats.mtime && (now.getTime() - stats.mtime.getTime()) < expireTime) {
					fs.readFile(config.fileName, function (err, data) {
						if (err) throw err;
						if (config.success) config.success(data);
					});
				} else {
					readAndSave (uri, config.fileName, config.success);
				}
			});
		} else {
			readAndSave (uri, config.fileName, config.success);
		}
	});
};
