

var baseUrl = 'http://api.football-data.org/alpha/soccerseasons/399';

var failed = function (req, res, next) {
	res.status(404).send('Not found');
};
var loadFixtures = function(req, res, next) {
	cache.loadCache(this.baseUrl + '/fixtures');
};
var loadFixture = function(req, res, next) {
	var matchday = req.params.matchday || 1;
	cache.loadCache( this.baseUrl + '/fixtures?matchday=' + (matchday || 1), function (data) {
		res.set('Content-Type', 'application/json')
			.status(200)
			.send(data);
	});
};
var loadTeams = function(req, res, next) {
	cache.loadCache(this.baseUrl + '/teams');
};


module.exports = {
	failed: failed,

	loadFixtures: loadFixtures,
	loadFixture: loadFixture,

	loadTeams: loadTeams
};
