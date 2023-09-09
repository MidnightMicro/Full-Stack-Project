const { Meals } = require("../models");
const bcrypt = require("bcrypt");

const getMeals = async (req, res) => {
  Meals.findAll({
    attributes: ["id", "Protein", "Vegetables", "Carbs"],
  }).then((meals) => {
    console.log(meals);

    res.render("meals", { meals: meals });
  });
};

module.exports = {
  getMeals,
};
