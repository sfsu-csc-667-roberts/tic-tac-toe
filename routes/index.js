const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", function (req, response, next) {
  db.any("SELECT * FROM users")
    .then((users) =>
      response.render("index", { users, error: { message: "" } })
    )
    .catch((error) => response.render("index", { error, users: [] }));
});

module.exports = router;
