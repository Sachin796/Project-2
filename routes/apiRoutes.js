var db = require("../models");

module.exports = function(app) {
  //Get all expense data where id = user id
  app.get("/api/expense", (req, resp) => {
    let id = req.session.passport.user.id;
    let expenseArr = [];
    let categoryArr = [];
    console.log("ID is " + id);
    db.Expense.findAll({
      group: ["category"],
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

  app.get("/api/location/:location");

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, resp) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
