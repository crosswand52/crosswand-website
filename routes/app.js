var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('app/app.html');
});

router.get('/gongda', function(req, res, next) {
  res.render('app/gongda/index.html');
});

router.get('/concerta', function(req, res, next) {
  res.render('app/concerta/index.html');
});

module.exports = router;
