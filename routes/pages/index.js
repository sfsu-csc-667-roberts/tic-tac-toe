const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/users/register', (_, response) => {
  response.render('unauthenticated/register')
})

module.exports = router;
