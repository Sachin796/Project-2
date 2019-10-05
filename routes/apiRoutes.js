// let Sequelize = require("sequelize");

require("dotenv").config();
var db = require("../models");
var sequelize = require("sequelize");
let Op = sequelize.Op;
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDCLs8xhTilm4mNw3zEXVT-2gsHdMdd_Vg",
  Promise: Promise
});

module.exports = function(app) {
  app.post("/api/profile", (req, res) => {
    //Define vars
    let id = req.session.passport.user.id;
    let expenseArr = [];
    let categoryArr = [];

    //SELECTED = DAY
    if (req.body.newdata == "day") {
      let todaysMonth = JSON.stringify(new Date().getMonth());
      let todaysDate = JSON.stringify(new Date().getDate());
      let year = JSON.stringify(new Date().getFullYear());
      let newString = year.concat("-" + todaysMonth);
      let newday = newString.concat("-" + todaysDate);
      console.log("Todays date is" + newday);
      db.Expense.findAll({
        attributes: [
          "category",
          [sequelize.fn("sum", sequelize.col("amount_spent")), "total"]
        ],
        where: {
          UserId: id,
          createdAt: {
            [Op.between]: [todaysDate, "2019-10-30"]
          }
        },
        group: ["category"]
      }).then(data => {
        console.log("All data is " + JSON.stringify(data));
        data.forEach(element => {
          // if(element.dataValues["total"].length)
          console.log(element.dataValues["total"]);
          expenseArr.push(element.dataValues["total"]);
          categoryArr.push(element.dataValues["category"]);
        });
        let allData = {
          expenseArr: expenseArr,
          categoryArr: categoryArr,
          id: id
        };
        if (expenseArr.length != 0) {
          res.send(allData);
        } else {
          res.send({ Error: "No data Available" });
        }
      });
    }

    //SELECTED = WEEK
    if (req.body.newdata == "week") {
      let todaysDate = new Date().toISOString().split("T")[0];
      const weekdate = new Date(new Date() - 7 * (24 * 60 * 60 * 1000))
        .toISOString()
        .split("T")[0];

      db.Expense.findAll({
        attributes: [
          "category",
          [sequelize.fn("sum", sequelize.col("amount_spent")), "total"]
        ],
        where: {
          UserId: id,
          createdAt: {
            [Op.between]: [weekdate, todaysDate]
          }
        },
        group: ["category"]
      }).then(data => {
        console.log("All data is " + JSON.stringify(data));
        data.forEach(element => {
          expenseArr.push(element.dataValues["total"]);
          categoryArr.push(element.dataValues["category"]);
        });
        let allData = {
          expenseArr: expenseArr,
          categoryArr: categoryArr,
          id: id
        };
        if (expenseArr.length != 0) {
          res.send(allData);
        } else {
          res.send({ Error: "No data Available" });
        }
      });
    }

    //SELECTED = MONTH
    if (req.body.newdata == "month") {
      let todaysDate = new Date().toISOString().split("T")[0];
      const previousMonthDate = new Date(
        new Date() - 31 * (24 * 60 * 60 * 1000)
      )
        .toISOString()
        .split("T")[0];

      console.log(
        `Todays date is ${todaysDate} , prevmonthdate is ${previousMonthDate}`
      );

      db.Expense.findAll({
        attributes: [
          "category",
          [sequelize.fn("sum", sequelize.col("amount_spent")), "total"]
        ],
        where: {
          UserId: id,
          createdAt: {
            [Op.between]: [previousMonthDate, todaysDate]
          }
        },
        group: ["category"]
      }).then(data => {
        console.log("All data is " + JSON.stringify(data));
        data.forEach(element => {
          expenseArr.push(element.dataValues["total"]);
          categoryArr.push(element.dataValues["category"]);
        });
        let allData = {
          expenseArr: expenseArr,
          categoryArr: categoryArr,
          id: id
        };
        if (expenseArr.length != 0) {
          res.send(allData);
        } else {
          res.send({ Error: "No data Available" });
        }
      });
    }
  });

  //Get all expense data where id = user id
  app.get("/api/expense", (req, res) => {
    let id = req.session.passport.user.id;
    let expenseArr = [];
    let categoryArr = [];
    db.Expense.findAll({
      attributes: [
        "category",
        [sequelize.fn("sum", sequelize.col("amount_spent")), "total"]
      ],
      where: {
        UserId: id
        // createdAt: {
        //   [Op.between]: ["2019-09-22", "2019-09-24"]
        // }
      },
      group: ["category"]
    }).then(data => {
      console.log("Data returned us " + JSON.stringify(data));
      data.forEach(element => {
        expenseArr.push(element.dataValues["total"]);
        categoryArr.push(element.dataValues["category"]);
      });

      if (expenseArr.length != 0) {
        let allData = {
          expenseArr: expenseArr,
          categoryArr: categoryArr,
          id: id,
          status: "ok"
        };
        res.send(allData);
      } else {
        let allData = {
          expenseArr: expenseArr,
          categoryArr: categoryArr,
          id: id,
          status: "error"
        };
        res.send(allData);
      }
    });
  });

  //GET LOCATIONS FROM USER IN DB API
  //SENDS BACK DATA BASED ON EXPENSE PURCHASE LOCATIONS IN JSON TO CLIENT.
  app.get("/api/get/locations", (req, res) => {
    let id = req.session.passport.user.id;

    db.Expense.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount_spent")), "total"],
        "Location.longitude",
        "Location.latitude",
        "Location.address"
      ],
      include: [{ model: db.Location, required: true }],
      where: { UserId: id },
      group: ["Location.address", "Location.latitude", "Location.longitude"]
    }).then(data => {
      res.json(data);
    });
  });

  //ADD AN EXPENSE
  app.post("/api/add/expense", (req, res) => {
    let id = req.session.passport.user.id;
    // console.log(req.body.Address + ","+ " " + req.body.Country)
    const address = req.body.Address + "," + " " + req.body.Country;
    console.log("THIS RIGHT HERE IS THE ADDRESS COMING OVER" + address);
    const price = req.body.Amount;
    const category = req.body.Category;
    const item = req.body.itemName;

    googleMapsClient
      .geocode({ address: address })
      .asPromise()
      .then(response => {
        console.log(response);
        const lat = response.json.results[0].geometry.location.lat;
        const long = response.json.results[0].geometry.location.lng;

        db.Location.create({
          address: address,
          longitude: long,
          latitude: lat,
          UserId: id
        }).then(function(insert) {
          let LocationId = insert.dataValues.id;
          db.Expense.create({
            amount_spent: price,
            category: category,
            item_name: item,
            UserId: id,
            LocationId: LocationId
          }).then(function(insert) {
            console.log("ALL DONE INSERTS");
            //res.sendStatus(200);
            res.redirect("/expense");
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(401).send({ error: "Please enter a valid address." });
      });
  });

  // TAKES INPUT FROM BUDGET PAGE AND UPDATES BUDGET TABLE. ONLY RECORDS ACTIVE BUDGET IN TABLE
  app.post("/api/add/budget", (req, res) => {
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
        //res.sendStatus(200);
        res.redirect("/budget");
      });
    });
    // console.log(req.body);
  });
};
