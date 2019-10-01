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
    resp.render("index");
  });

  //LOCATIONS ENDPOINT
  app.get("/locations", (req, resp) => {
    console.log(req.session);
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
    console.log(req.session.passport.user.username);
    let username = req.session.passport.user.username;
    let id = req.session.passport.user.id;

    resp.render("profilePage", { layout: "profile", username, id });
    // resp.send(req.session);
  });

  //REGISTER
  app.get("/register", (req, resp, next) => {
    console.log(req.session);
    resp.render("registerPage", { layout: "register" });
  });

  //LOGIN
  app.get("/login", (req, resp, next) => {
    console.log(req.session);
    resp.render("loginPage", { layout: "login" });
  });

  //LOGOUT
  app.get("/logout", (req, resp) => {
    console.log(req.session);
    req.logout();
    resp.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, resp, next) {
    console.log(req.session);
    resp.render("404");
  });
};
