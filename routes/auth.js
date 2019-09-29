const express = require("express");
const Router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = function(passport) {
  // ROUTE: /api/auth/register
  Router.post("/register", async (req, resp) => {
    let body = req.body,
      username = body.username,
      password = body.password;
    db.User.findOne({
      where: {
        username: username
      }
    }).then((err, res) => {
      if (err) {
        resp.status(500).send("USER EXISTS");
      } else {
        console.log("HELLO");
        let newUser = new db.User();
        newUser.username = username;
        newUser.password = newUser.hashPassword(password);
        newUser.save().then(user => {
          if (!user) {
            resp.send("ERROR");
          } else {
            resp.send(user);
          }
        });
      }
    });
  });

  //ROUTE: /api/auth/login
  Router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/"
    }),
    function(req, resp) {
      resp.send("HEY");
    }
  );
  return Router;
};
