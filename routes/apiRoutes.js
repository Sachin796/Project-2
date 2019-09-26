var db = require("../models");

module.exports = function(app) {
  //Get all expense data where id = user id
  //NEED AN EXPENSES TABLE.
  app.get("/api/expense/:id", (req, resp) => {
    db.expenses
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
  app.post("/api/examples", function(req, resp) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, resp) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
