var db = require("../models");

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
  app.get("/profile", (req, resp) => {
    resp.render("profilePage", { layout: "profile" });
  });

  //REGISTER
  app.get("/register", (req, resp) => {
    resp.render("registerPage", { layout: "register" });
  });

  //REGISTER POST
  app.post("/register/submit", (req, resp) => {
    let { username, password } = req.body;
    console.log(req.body);
    // console.log(username, password);
    let errors = [];
    if (!username || !password) {
      errors.push({ msg: "Please enter all fields" });
    }
    if (password.length < 6) {
      errors.push({ msg: "Password should be greater than 6 characters " });
    }
    if (errors.length > 0) {
      console.log("WHAT THE F");
      //I cant get this to render.. we're in here, hence the what the f message,
      //but it isnt rendering the page.
      resp.render("registerPage", { errors, username, password });
    }
    if (errors.length === 0) {
      db.User.create(req.body)
        .then(res => {
          resp.json(res);
        })
        .catch(err => {
          throw err;
        });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, resp) {
    resp.render("404");
  });
};
