const express = require('express')
const router = express.Router()
const passport = require('../authentication')

router.get('/login', function (request, response) {
  const message = request.flash('error')

  response.render('unauthenticated/login', { message })
})

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  (_, response) => response.redirect('/lobby')
)

router.get('/logout', (request, response) => {
  request.logout()
  response.redirect('/')
})

router.get('/register', function (_, response) {
  response.render('unauthenticated/register')
})

module.exports = router
