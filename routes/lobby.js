const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

router.get("/", ensureLoggedIn("/users/login"), (request, response) => {
  response.render("authenticated/lobby");
});

module.exports = router;
