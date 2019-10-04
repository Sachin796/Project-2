var db = require("../models");
var Sequelize = require("sequelize");

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

  //Expenses
  app.get("/expense", loggedIn, (req, resp, next) => {
    let id = req.session.passport.user.id;
    let expense = [];
    db.Expense.findAll({
      where: {
        UserId: id
      }
    })
      .then(res => {
        console.log("THIS IS THE QUERY RESULT ----------------------------------------" + res[0].dataValues);
        // loop through results and push to correct objects.
        for (i = 0; i < res.length; i++) {
          let amtSpent = res[i].dataValues.amount_spent;
          let category = res[i].dataValues.category;
          let itemName = res[i].dataValues.item_name;
          expense.push({ amount: amtSpent, category: category, itemName: itemName });
        }

        resp.render("expensePage", { layout: "expense", expense });
      })
      .catch(err => {
        console.log("HELLO");
        resp.render("expensePage", { layout: "expense" });
      });
  });

  //LOGIN
  app.get("/login", (req, resp, next) => {
    console.log(req.session);
    resp.render("loginPage", { layout: "login" });
  });
  
  
  //Budget EndPoint
  app.get("/budget", (req, resp, next) => {
    let id = req.session.passport.user.id;
    let budget = [];
    let sumExpense = 0;
    let budgetLeft = 0;
    let fromDate;
    let toDate;
    const Op = Sequelize.Op
    db.Budget.findAll({
      where: {
        UserId: id
      }
    })
      .then(res => {
        console.log("THIS IS THE QUERY RESULT ----------------------------------------" + res[0].dataValues);
        //THIS CODE GETS START DATE, FROM DATE, AND BUDGET FROM BUDGET TABLE
        for (i = 0; i < res.length; i++) {
          fromDate = res[i].dataValues.date_from;
          toDate = res[i].dataValues.date_to;
          let budgetAmt = res[i].dataValues.budget;
          budgetLeft = res[i].dataValues.budget;
          budget.push({ fromDate,toDate,budgetAmt });
        }
        // GETS INFO FROM EXPENSE TABLE HERE BETWEEN ACTIVE BUDGET DATES
        db.Expense.findAll({
          where: {
            UserId: id,
            createdAt: {
              [Op.between]: [fromDate, toDate]

            }
          }
        }).then(function(res){
          for (i = 0; i < res.length; i++) {
             sumExpense = parseFloat(res[i].dataValues.amount_spent) + parseFloat(sumExpense);
             budgetLeft = parseFloat(budgetLeft) - parseFloat(sumExpense);
             
          }
          resp.render("budgetPage", { layout: "budget",budget,budgetLeft});
        })

      })
      .catch(err => {
        console.log(err)
        console.log("HELLO");
        resp.render("budgetPage", { layout: "budget" });
      });
    
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
