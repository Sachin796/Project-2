require("dotenv").config();
var db = require("../models");
var sequelize = require("sequelize");
let Op = sequelize.Op;
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDCLs8xhTilm4mNw3zEXVT-2gsHdMdd_Vg",
  Promise: Promise
});

module.exports = function(app) {
  //Get all expense data where id = user id
  app.get("/api/expense", (req, resp) => {
    let id = req.session.passport.user.id;
    let expenseArr = [];
    let categoryArr = [];
    console.log("ID is " + id);
    db.Expense.findAll({
      attributes: ["category", "amount_spent"],
      where: {
        UserId: id
      }
    }).then(data => {
      console.log(data);
      data.forEach(element => {
        expenseArr.push(element.dataValues["amount_spent"]);
        categoryArr.push(element.dataValues["category"]);
      });
      let alldata = {
        expenseArr: expenseArr,
        categoryArr: categoryArr,
        id: id
      };
      resp.json(alldata);
    });
  });

  //ADD AN EXPENSE
  app.post("/api/add/expense", (req, resp) => {
    let id = req.session.passport.user.id;

    // console.log(req.body.Address + ","+ " " + req.body.Country)
    const address = req.body.Address + "," + " " + req.body.Country;
    console.log("THIS RIGHT HERE IS THE ADDRESS COMING OVER" + address)
    const price = req.body.Amount;
    const category = req.body.Category;
    const item = req.body.itemName;

    googleMapsClient
      .geocode({ address: address })
      .asPromise()
      .then(response => {
        const lat = response.json.results[0].geometry.location.lat;
        const long = response.json.results[0].geometry.location.lng;

        db.Location.create({
          address: address,
          longitude: long,
          latitude: lat,
          UserId: id
        }).then(function(insert) {
          let locId = insert.id;
          db.Expense.create({
            amount_spent: price,
            category: category,
            item_name: item,
            UserId: id,
            LocationId: locId
          }).then(function(insert) {
            console.log("ALL DONE INSERTS");
            //resp.sendStatus(200);
            resp.redirect("/expense");
          });
        });
      })
      .catch(err => {
        console.log(err);
        resp.status(401).send({error: "Please enter a valid address."})
      });
  });

  // TAKES INPUT FROM BUDGET PAGE AND UPDATES BUDGET TABLE. ONLY RECORDS ACTIVE BUDGET IN TABLE
  app.post("/api/add/budget", (req, resp) => {
    console.log(req.body);
    let id = req.session.passport.user.id;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;
    let budget = req.body.Amount;
    db.Budget.destroy({
      where: {
        UserId: id
      }
    }).then(function() {
      db.Budget.create({
        date_from: fromDate,
        date_to: toDate,
        budget: budget,
        UserId: id
      }).then(function() {
        console.log("ALL DONE INSERTS");
        //resp.sendStatus(200);
        resp.redirect("/budget");
      });
    });
    // console.log(req.body);
  });

  //GET LOCATIONS FROM USER IN DB API
  //SENDS BACK DATA BASED ON EXPENSE PURCHASE LOCATIONS IN JSON TO CLIENT.
  app.get("/api/get/locations", (req, resp) => {
    let id = req.session.passport.user.id;
    db.Expense.findAll({
      include: [{ model: db.Location, required: true }],
      where: {
        UserId: id
      }
    }).then(res => {
      resp.json(res);
    });
  });
};
