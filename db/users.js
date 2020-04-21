const db = require('./connection.js')

const create = (email, password) =>
  db.any("INSERT INTO users (email, password) VALUES($1, $2) RETURNING id, email", [email, password])

const findById = id =>
  db.one("SELECT id, email, created_at FROM users WHERE id=$1", [id])

const findByEmailAndPassword = (email, password) =>
  db.one("SELECT id, email, created_at FROM users WHERE email=${email} and password=${password}", { email, password })

module.exports = {
  create,
  findById,
  findByEmailAndPassword
}