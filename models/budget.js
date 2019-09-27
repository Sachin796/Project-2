module.exports = function(sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
      date_from:  {
        type:  DataTypes.DATEONLY,
      allowNull: false,
      validate: {
          len: [1]
      }
    },

      date_to: {
        type:  DataTypes.DATEONLY,
        allowNull: false,
        validate: {
        len: [1]
      }
      },

      budget: {
        type:  DataTypes.FLOAT,
        allowNull: false,
        validate: {
        len: [1]
      }
    },
    
    });

    Budget.associate = function(models){
        models.Budget.belongsTo(models.User,{
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Budget;
  };
  