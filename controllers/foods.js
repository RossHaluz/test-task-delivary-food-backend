const { HttpError, ctrlWrapper } = require("../healpers");
const { FoodModel } = require("../models/foods");
const { OrderModel } = require("../models/orders");

const getFoods = async (req, res) => {
  const foods = await FoodModel.find();

  res.json(foods);
};

const getFoodsCurrent = async (req, res) => {
  const { category } = req.params;
  const foods = await FoodModel.find({ category });

  res.json({ foods });
};

const setFoodOrder = async (req, res) => {
  const { name, phone, address } = req.body;
  const newOrder = await OrderModel.create({ name, phone, address });

  res.json(newOrder);
};

const getCurrentOrders = async (req, res) => {
  const { phone } = req.body;
  const currentOrders = await OrderModel.find({ phone });

  res.json({ currentOrders });
};

const getFood = async (req, res) => {
  const { foodId } = req.params;
  const food = await FoodModel.findById(foodId);

  if (!food) {
    return HttpError(404, "Not found");
  }

  res.json(food);
};

module.exports = {
  getFoods: ctrlWrapper(getFoods),
  getFoodsCurrent: ctrlWrapper(getFoodsCurrent),
  setFoodOrder: ctrlWrapper(setFoodOrder),
  getCurrentOrders: ctrlWrapper(getCurrentOrders),
  getFood: ctrlWrapper(getFood),
};
