var express = require('express');
var router = express.Router();

/* GET  */
router.get('/fixtures', function(req, res, next) {

	var matchday = req.body.matchday || 1;

	res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
	res.render('list');
});

module.exports = router;
