const express = require("express");
const Router = express.Router();
const db = require("../models");
let bcrypt = require("bcrypt");

const passport = require("passport");
const initPassport = require("./passport-config.js");
initPassport(passport, username => {
  //send in the DB check for user.
});

Router.post("/register", async (req, resp) => {
  const user = {
    username: req.body.username,
    user_password: req.body.user_password
  };
  console.log(req.body.username);

  try {
    //hash the password
    const hashPass = await bcrypt.hash(req.body.user_password, 10);
    //CHECK IF USER EXISTS.
    db.User.findAll({ where: { username: req.body.username } }).then(async res => {
      if (res.length > 0) {
        resp.render("registerPage", req.body);
      } else {
        await db.User.create({
          username: req.body.username,
          user_password: hashPass
        })
          .then(res => {
            //SUCCESS
            console.log("SUCCESS");
            resp.render("profilePage", req.body);
          })
          .catch(err => {
            res.status(400).send(err);
          });
      }
    });
  } catch (err) {
    // console.log(err);
    // resp.render("registerPage");
  }

  //   resp.json(req.body);
  //   resp.render("profilePage", { layout: "profile", data });
});

Router.post("/login", async (req, resp) => {
  let data = {
    username: req.body.username,
    user_password: req.body.user_password
  };
});

module.exports = Router;
