var db = require("../models");

module.exports = function(app) {
  //Get all expense data where id = user id
  app.get("/api/expense/:id", (req, resp) => {
    let expenseArr = [];
    let categoryArr = [];
    let userId = req.params.id;
    console.log("ID is " + userId);
    db.Expense.findAll({
      group: ["category"],
      where: {
        UserId: 1
      }
    }).then(data => {
      data.forEach(element => {
        expenseArr.push(element.dataValues["amount_spent"]);
        categoryArr.push(element.dataValues["category"]);
      });
      resp.send({ expenseArr, categoryArr, userId });
    });
  });

  // Create a new example
  app.post("/api/expense", function(req, resp) {
    // db.Example.create(req.body).then(function(dbExample) {
    //   resp.json(dbExample);
    // });
    let { id } = req.body;
    db.expsense
      .create(req.body)
      .then(res => {
        resp.json(res);
      })
      .catch(err => {
        throw err;
      });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, resp) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
