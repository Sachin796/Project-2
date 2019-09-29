var localStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(
    new localStrategy(function(username, password, done) {
      db.User.findOne({
        where: {
          username: username
        }
      }).then(res => {
        if (!res) {
          done(null, null, false);
        } else {
          let valid = res.comparePassword(password, res.password);
          if (valid) {
            //VALID PASS
            done(null, {
              username: res.username,
              password: res.password
            });
          } else {
            //NOT VALUD
            done(null, false);
          }
        }
      });
    })
  );
};
