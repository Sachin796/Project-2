module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    // address: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    //   validate: {
    //     len: [1]
    //   }
    // },
    longitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
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
