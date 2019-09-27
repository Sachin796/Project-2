module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
      address:  {
        type:  DataTypes.TEXT,
      allowNull: false,
      validate: {
          len: [1]
      }
    },   
    });

    Location.associate = function(models){
      models.Location.belongsTo(models.User,{
          onDelete: "CASCADE",
          foreignKey: {
              allowNull: false
          }
      });
  };
    return Location;
  };
  