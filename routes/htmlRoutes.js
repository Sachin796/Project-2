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
  app.get("/locations", loggedIn, (req, resp) => {
    let id = req.session.passport.user.id;
    db.Location.findAll({
      where: {
        UserId: id
      }
    })
      .then(res => {
        resp.render("locationPage", { layout: "location" });
      })
      .catch(err => {
        resp.send(err);
      });
  });

  //PROFILE ENDPOINT
  app.get("/profile", loggedIn, (req, resp, next) => {
    console.log(req.session.passport.user.username);
    let username = req.session.passport.user.username;
    resp.render("profilePage", { layout: "profile", username });
    // resp.send(req.session);
  });

  //REGISTER
  app.get("/register", (req, resp, next) => {
    console.log(req.session);
    resp.render("registerPage", { layout: "register" });
  });

  //Expenses
  app.get("/expense", (req, resp, next) => {
    let id = req.session.passport.user.id;
    let amount = [];
    db.Expense.findAll({
      where: {
        UserId: id
      }
    })
      .then(res => {
        console.log("THIS IS THE QUERY RESULT ----------------------------------------" + res[0].dataValues)
        // loop through results and push to correct objects.
        for(i=0; i < res.length; i++){
          let amtSpent = res[i].dataValues.amount_spent;
          let category = res[i].dataValues.category;
          let itemName = res[i].dataValues.item_name;
          amount.push({"amount": amtSpent, "category" : category, "itemName": itemName})
        }
        
        resp.render("expensePage", { layout: "expense", item: amount});
      })
      .catch(err => {
        resp.send(err);
      });
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
