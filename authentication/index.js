const passport = require('passport')
const Strategy = require('passport-local').Strategy

const db = require('../db')

const findUserCallback = (email, password, callback) => {
  db.Users.findByEmailAndPassword(email, password)
    .then(user => {
      return callback(null, user)
    })
    .catch(_ => {
      return callback(null, false, "Email or password not found.")
    })
}

const serializeUser = (user, callback) => {
  callback(null, user.id)
}

const deserializeUser = (id, callback) => {
  db.Users.findById(id)
    .then(user => {
      callback(null, user)
    })
    .catch(error => {
      callback(error)
    })
}

passport.use(new Strategy(findUserCallback))

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

module.exports = passport