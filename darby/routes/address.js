var express = require('express');
var router = express.Router();

/* GET address listing. */
router.get('/', function(req, res, next) {
  res.render('address/index.ejs', { title: 'Express' });
});

module.exports = router;
