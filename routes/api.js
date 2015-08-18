var cache = require('../lib/cache');
var express = require('express');
var router = express.Router();

router.get('/', error404);

/* GET  */
router.get('/fixtures', function(req, res, next) {
	cache.loadCache('http://api.football-data.org/alpha/soccerseasons/399/fixtures');
});

/* GET  */
router.get('/fixtures/:matchday', function(req, res, next) {

	var matchday = req.params.matchday || 1;

	cache.loadCache('http://api.football-data.org/alpha/soccerseasons/399/fixtures?matchday=' + (matchday || 1), function (data) {
		res.set('Content-Type', 'application/json')
			.status(200)
			.send(data);
	})
});

router.get('/list', function(req, res, next) {
	res.render('list');
});

function error404(req, res, next) {
	res.status(404).send('Not found');
}

module.exports = router;
