const { HttpError, ctrlWrapper } = require("../healpers");
const { FoodModel } = require("../models/foods");

const getFoods = async (req, res) => {
  const foods = await FoodModel.find();

  res.json(foods);
};

const getFoodsCurrent = async (req, res) => {
  const { category } = req.params;
  const foods = await FoodModel.find({ category });

  res.json({ foods });
};

module.exports = {
  getFoods: ctrlWrapper(getFoods),
  getFoodsCurrent: ctrlWrapper(getFoodsCurrent),
};
