module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    amount_spent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    category: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    item_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Expense.associate = function(models) {
    models.Expense.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    }),
      models.Expense.belongsTo(models.Location, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
  };
  return Expense;
};
