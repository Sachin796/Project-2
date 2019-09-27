var db = require("../models");

module.exports = function(app) {
  //Get all expense data where id = user id
  app.get("/api/expense/:id", (req, resp) => {
    db.expense
      .findAll({
        where: {
          id: req.params.id
        }
      })
      .then(res => {
        resp.json(res);
      })
      .catch(err => {
        throw err;
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
