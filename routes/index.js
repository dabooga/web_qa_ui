var express = require('express');
var router = express.Router();
var axios = require('axios');

var web_vars = {
  title: 'QA Web',
  error_msg: ''
}
/* GET home page. */
router.get('/', function(req, res, next) {
  web_vars.error_msg = ""
  res.render('index', web_vars);
});

module.exports = router;
