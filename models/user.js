let bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  User.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  User.prototype.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash);
  };

  return User;
};
