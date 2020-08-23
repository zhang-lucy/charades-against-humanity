var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new-game', { title: 'Charades Against Humanity' });
});

module.exports = router;
