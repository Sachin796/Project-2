var db = require("../models");
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDCLs8xhTilm4mNw3zEXVT-2gsHdMdd_Vg",
  Promise: Promise
});

module.exports = function(app) {
  //GET ALL EXPENSE DATA
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

  //ADD AN EXPENSE
  app.post("/api/add/expense", (req, resp) => {
    let id = req.session.passport.user.id;
    
    // console.log(req.body.Address + ","+ " " + req.body.Country)
    const Address = (req.body.Address + ","+ " " + req.body.Country)
    const price = req.body.Amount
    const category = req.body.Category 
    const item = req.body.itemName 
  

    googleMapsClient.geocode({address: Address})
  .asPromise()
  .then((response) => {
    
    const lat = response.json.results[0].geometry.location.lat;
    const long = response.json.results[0].geometry.location.lng;
    db.Location.create({
      long: long,
      lat: lat,
      UserId: id
    }).then(function(insert){
      let locId = insert.id
      db.Expense.create({
        amount_spent: price,
        category: category,
        item_name: item,
        UserId : id,
        LocationId: locId

      }).then(function(insert){
        console.log("ALL DONE INSERTS")
        //resp.sendStatus(200);
        resp.redirect('/expense');
        
      })
      
    })
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(401)
  });

  });

  // GET EXPENSES
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

  app.get("/api/get/locations/", (req, resp) => {
    let id = req.session.passport.user.id;
    db.Expense.findAll({
      include: [{ model: Locations, as: "l", required: true }],
      attributes: [
        ["e.amount_spent", "e.amount_spent"],
        ["e.UserId", "e.UserId"],
        ["e.category", "e.category"],
        ["e.item_name", "e.item_name"],
        ["l.address", "l.address"]
      ],
      where: { [Op.and]: [{ "$e.UserId$": { [Op.eq]: id } }] }
    }).then(res => {
      resp.json(res);
    });
  });
};
