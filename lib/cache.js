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
			var fd = fs.openSync(fileName, 'w');
			fs.writeFile(fileName, data, function (err) {
				if (err) throw err;
				console.log(fileName + ' saved!');
			});
			callback && callback(data);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

exports.loadCache = function loadCache(uri, callback) {

	var expireTime = 1 * 60 * 60 * 1000;	// 1 horas
	var fileName = path.join(__dirname, '../cache/fixture.json'); // + uri.replace(normalize, "_");

	fs.exists(fileName, function (exists) {
		if (exists) {
			var stats = fs.stat(fileName, function (err, stats) {
				if (err) throw err;
				if (stats.mtime && stats.mtime.getTime() < expireTime) {
					fs.readFile(fileName, function (err, data) {
						if (err) throw err;
						callback && callback(data);
					});
				} else {
					readAndSave (uri, fileName, callback);
				}
			});
		} else {
			readAndSave (uri, fileName, callback);
		}
	});

	fs.stat(fileName, function (err, stats) {});

}
