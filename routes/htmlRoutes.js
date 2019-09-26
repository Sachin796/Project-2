var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, resp) {
    db.Example.findAll({}).then(function(dbExamples) {
      resp.render("index", {});
    });
  });

  //LOCATIONS ENDPOINT
  app.get("/locations", (req, resp) => {
    resp.render("locationPage", { layout: "location" });
  });

  //PROFILE ENDPOINT
  app.get("/profile", (req, resp) => {
    resp.render("profilePage", { layout: "profile" });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, resp) {
    resp.render("404");
  });
};
