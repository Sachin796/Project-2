require("dotenv").config();
var db = require("../models");
var sequelize = require("sequelize");
let Op = sequelize.Op;
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDCLs8xhTilm4mNw3zEXVT-2gsHdMdd_Vg",
  Promise: Promise
});

module.exports = function(app) {
  app.post("/profile", (req, res) => {
    let id = req.session.passport.user.id;
    let expenseArr = [];
    let categoryArr = [];
    if (req.body.newdata == "week") {
      let todaysDate = new Date()
        .toISOString()
        .replace("Z", "")
        .replace("T", " ")
        .slice(0, -4);
      let weekdate = new Date(new Date().getTime - 7 * (24 * 60 * 60 * 1000))
        .toISOString()
        .replace("Z", "")
        .replace("T", " ")
        .slice(0, -4);
      db.Expense.findAll({
        attributes: ["category", "amount_spent"],
        where: {
          UserId: id
        },
        from: {
          $between: [todaysDate, weekdate]
        }
      }).then(data => {
        console.log(data);
        data.forEach(element => {
          expenseArr.push(element.dataValues["amount_spent"]);
          categoryArr.push(element.dataValues["category"]);
        });
        let allData = {
          expenseArr: expenseArr,
          categoryArr: categoryArr,
          id: id
        };
        console.log(allData);
        // res.send(allData);
      });
    } else if (req.body.newdata == "month") {
    } else {
    }
  });

  //Get all expense data where id = user id
  app.get("/api/expense", (req, resp) => {
    console.log(
      // new Date()
      //   .replace("Z", "")
      //   .replace("T", " ")
      //   .slice(0, -4) <
      new Date(new Date().getTime() - 7 * (24 * 60 * 60 * 1000))
        .toISOString()
        .replace("Z", "")
        .replace("T", " ")
        .slice(0, -4)
    );
    let id = req.session.passport.user.id;
    let expenseArr = [];
    let categoryArr = [];
    db.Expense.findAll({
      attributes: ["category", "amount_spent"],
      where: {
        UserId: id
      }
    }).then(data => {
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

  // //get week data
  // app.get("profile/week", (req, resp) => {
  //   let id = req.session.passport.user.id;
  //   let expenseArr = [];
  //   let categoryArr = [];
  //   console.log("ID is " + id);
  //   db.Expense.findAll({
  //     attributes: ["category", "amount_spent"],
  //     where: {
  //       UserId: id
  //     },
  //     createdAt: {
  //       $lt: new Date(),
  //       $gt: new Date(new Date() - 7 * (24 * 60 * 60 * 1000))
  //     }
  //   }).then(data => {
  //     console.log(data);
  //     data.forEach(element => {
  //       expenseArr.push(element.dataValues["amount_spent"]);
  //       categoryArr.push(element.dataValues["category"]);
  //     });
  //     let alldata = {
  //       expenseArr: expenseArr,
  //       categoryArr: categoryArr,
  //       id: id
  //     };
  //     resp.render("profilePage", { layout: "profile", alldata });
  //   });
  // });

  //get month data
  // app.get("profile/month", (req, resp) => {
  //   let id = req.session.passport.user.id;
  //   let expenseArr = [];
  //   let categoryArr = [];
  //   console.log("ID is " + id);
  //   db.Expense.findAll({
  //     attributes: ["category", "amount_spent"],
  //     where: {
  //       UserId: id
  //     },
  //     createdAt: {
  //       $lt: new Date(),
  //       $gt: new Date(new Date() - 30 * (24 * 60 * 60 * 1000))
  //     }
  //   }).then(data => {
  //     console.log(data);
  //     data.forEach(element => {
  //       expenseArr.push(element.dataValues["amount_spent"]);
  //       categoryArr.push(element.dataValues["category"]);
  //     });
  //     let alldata = {
  //       expenseArr: expenseArr,
  //       categoryArr: categoryArr,
  //       id: id
  //     };
  //     resp.render("profilePage", { layout: "profile", alldata });
  //   });
  // });

  //ADD AN EXPENSE
  app.post("/api/add/expense", (req, resp) => {
    let id = req.session.passport.user.id;

    // console.log(req.body.Address + ","+ " " + req.body.Country)
    const Address = req.body.Address + "," + " " + req.body.Country;
    const price = req.body.Amount;
    const category = req.body.Category;
    const item = req.body.itemName;

    googleMapsClient
      .geocode({ address: Address })
      .asPromise()
      .then(response => {
        const lat = response.json.results[0].geometry.location.lat;
        const long = response.json.results[0].geometry.location.lng;
        db.Location.create({
          long: long,
          lat: lat,
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
            //resp.sendStatus(200);
            resp.redirect("/expense");
          });
        });
      })
      .catch(err => {
        res.sendStatus(401);
      });
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

  app.post("/api/add/expense", (req, resp) => {
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
