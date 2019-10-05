require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var Handlebars = require("handlebars");

//Handlebars Partials

//PASSPORT
const passport = require("passport");
require("./config/passport-config")(passport);

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "SECRETKEY",
    saveUninitialized: false,
    resave: false
  })
);
//passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const authRoute = require("./routes/auth")(passport);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Auth Routing
app.use("/api/auth", authRoute);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelizeConnection.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    // eslint-disable-next-line prettier/prettier
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
