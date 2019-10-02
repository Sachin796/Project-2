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

  // Create a new example
  // app.post("/api/expense", function(req, resp) {
  //   // db.Example.create(req.body).then(function(dbExample) {
  //   //   resp.json(dbExample);
  //   // });
  //   let { id } = req.body;
  //   db.expsense
  //     .create(req.body)
  //     .then(res => {
  //       resp.json(res);
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // });

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

  app.post("/api/add/expense", (req, resp) => {
    console.log(req.body);
    let id = req.session.passport.user.id;
    // console.log(req.body.Address + ","+ " " + req.body.Country)
    const Address = req.body.address + "," + " " + req.body.country;
    const price = req.body.amount;
    const category = req.body.category;
    const item = req.body.item;
    googleMapsClient
      .geocode({ address: Address })
      .asPromise()
      .then(response => {
        const lat = response.json.results[0].geometry.location.lat;
        const long = response.json.results[0].geometry.location.lng;
        db.Location.create({
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
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
