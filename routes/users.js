const express = require('express')
const router = express.Router()

router.get('/login', function (_, response) {
  response.render('unauthenticated/login')
})

router.get('/register', function (_, response) {
  response.render('unauthenticated/register')
})

module.exports = router
