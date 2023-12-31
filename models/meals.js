"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meals.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Meals.init(
    {
      Protein: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Meals",
    }
  );
  return Meals;
};