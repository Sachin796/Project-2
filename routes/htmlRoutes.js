var db = require("../models");

let loggedIn = function(req, resp, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    resp.redirect("/login");
  }
};

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, resp) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   resp.render("index", {});
    //render our home page
    resp.render("index");
  });

  //LOCATIONS ENDPOINT
  app.get("/locations", (req, resp) => {
    db.Location.findAll({
      where: {
        UserId: req.body.id
      }
    })
      .then(res => {})
      .catch(err => {});
    resp.render("locationPage", { layout: "location" });
  });

  //PROFILE ENDPOINT
  app.get("/profile", loggedIn, (req, resp, next) => {
    // resp.render("profilePage", { layout: "profile" });
    resp.send(req.session);
  });

  //REGISTER
  app.get("/register", (req, resp, next) => {
    resp.render("registerPage", { layout: "register" });
  });

  //LOGIN
  app.get("/login", (req, resp, next) => {
    resp.render("loginPage", { layout: "login" });
  });

  //LOGOUT
  app.get("/logout", (req, resp) => {
    req.logout();
    resp.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, resp, next) {
    resp.render("404");
  });
};
