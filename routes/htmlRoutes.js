var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, resp) {
    db.Example.findAll({}).then(function(dbExamples) {
      resp.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
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
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, resp) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      resp.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, resp) {
    resp.render("404");
  });
};
