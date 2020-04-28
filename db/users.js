const db = require('./connection.js')

const create = (email, password) =>
  db.one("INSERT INTO users (email, password) VALUES($1, $2) RETURNING id, email", [email, password])

const findById = id =>
  db.one("SELECT id, email, created_at FROM users WHERE id=$1", [id])

const findPasswordByEmail = email =>
  db.any("SELECT password FROM users WHERE email=$1", [email])
    .then(rows => {
      if (rows.length !== 1) {
        return Promise.reject(`Credentials invalid.`)
      } else {
        return rows[0];
      }
    })

const findByEmailAndPassword = (email, password) =>
  db.one("SELECT id, email, created_at FROM users WHERE email=${email} and password=${password}", { email, password })

module.exports = {
  create,
  findById,
  findPasswordByEmail,
  findByEmailAndPassword
}