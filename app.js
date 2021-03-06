const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const passport = require("./authentication");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const lobbyRouter = require("./routes/lobby");
const gamesRouter = require("./routes/games");

const apiRouter = require("./routes/api/game");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const sessionMiddleware = session({
  store: new (require("connect-pg-simple")(session))(),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
});

app.use(sessionMiddleware);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((request, response, next) => {
  if (request.user !== undefined) {
    response.locals.user = request.user;
  } else {
    response.locals.user = {};
  }

  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/lobby", lobbyRouter);
app.use("/games", gamesRouter);
app.use("/api/games", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, sessionMiddleware };
