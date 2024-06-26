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
  res.render('login', web_vars);
});


router.post('/', async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const data = { username, password };
  web_vars.error_msg = ""

  try {
    const apiResponse = await axios.post(ApiURL + '/login', data);
    req.session.token = apiResponse.data.access_token;
    res.redirect('/sprint');
  } catch (error) {
    console.error('Error:', error);
    web_vars.error_msg ="Error login user"
    res.status(401).render('login', web_vars);
  }
});

module.exports = router;