module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    // address: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    long: {
      type: DataTypes.DECIMAL(10, 10),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 10),
      allowNull: false
    }
  });

  Location.associate = function(models) {
    models.Location.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Location;
};
