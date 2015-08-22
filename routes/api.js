var cache = require('../lib/cache');
var express = require('express');
var router = express.Router();

/* GET  */
//router.get('/', controller.error);
router.get('/fixtures', loadFixtures);
router.get('/fixtures/:matchday', loadFixture);

router.get('/teams', loadTeams);

// catch 404 and forward to error handler
router.get('*', failed);


var baseUrl = 'http://api.football-data.org/alpha/soccerseasons/399';
var dataFilePath = '../public/data';

function success(res, data) {
	res.set('Content-Type', 'application/json')
		.status(200)
		.send(data);
}
function failed(req, res, next) {
	res.status(404).send('Not found');
}
function loadFixtures(req, res, next) {
	cache.loadCache(baseUrl + '/fixtures', {
		success: function (data) {
			success(res, data);
		}
	});
}
function loadFixture(req, res, next) {
	var matchday = req.params.matchday || 1;
	cache.loadCache(baseUrl + '/fixtures?matchday=' + (matchday || 1), {
		success: function (data) {
			success(res, data);
		}
	});
}
function loadTeams(req, res, next) {
	cache.loadCache(baseUrl + '/teams', {
		saveAs: dataFilePath + '/teams.json',
		success: function (data) {
			success(res, data);
		}
	});
}


module.exports = router;
