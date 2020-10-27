const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("../db");

const findUserCallback = (email, password, callback) => {
  return db.Users.findPasswordByEmail(email)
    .then(({ password: hashedPassword }) =>
      Promise.all([bcrypt.compare(password, hashedPassword), hashedPassword])
    )
    .then(([result, hashedPassword]) => {
      if (result) {
        return Promise.resolve(hashedPassword);
      } else {
        return Promise.reject("Credentials invalid.");
      }
    })
    .then((validatedPassword) =>
      db.Users.findByEmailAndPassword(email, validatedPassword)
    )
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(null, false, error);
    });
};

const serializeUser = (user, callback) => {
  callback(null, user.id);
};

const deserializeUser = (id, callback) => {
  db.Users.findById(id)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
};

passport.use(new Strategy(findUserCallback));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;
