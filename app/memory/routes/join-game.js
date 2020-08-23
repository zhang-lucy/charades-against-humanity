var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('join-game', { title: 'Charades Against Humanity' });
});

module.exports = router;
