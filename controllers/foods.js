const { HttpError, ctrlWrapper, pagination } = require("../healpers");
const { FoodModel } = require("../models/foods");
const { OrderModel } = require("../models/orders");

const getFoods = async (req, res) => {
  const { page: processedPage, limit: processedLimit } = req.query;
  const { page, limit, skip } = pagination(processedPage, processedLimit);

  const foods = await FoodModel.find({}, "", { skip, limit });
  const totalFoods = await FoodModel.find().count();
  res.json({
    foods,
    meta: {
      totalFoods,
      currentPage: page,
      totalPage: Math.ceil(totalFoods / limit),
    },
  });
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

const getFoodsCategory = async (req, res) => {
  const { shop, page: parcessedPage, limit: parcessedLimit } = req.query;
  const { page, skip, limit } = pagination(parcessedPage, parcessedLimit);

  const foods = await FoodModel.find({ name: shop }, "", { skip, limit });
  const countFoods = await FoodModel.find({ name: shop }).count();

  res.json({
    foods,
    meta: {
      countFoods,
      totalPage: Math.ceil(countFoods / limit),
      currentPage: page,
    },
  });
};

module.exports = {
  getFoods: ctrlWrapper(getFoods),
  getFoodsCurrent: ctrlWrapper(getFoodsCurrent),
  setFoodOrder: ctrlWrapper(setFoodOrder),
  getCurrentOrders: ctrlWrapper(getCurrentOrders),
  getFood: ctrlWrapper(getFood),
  getFoodsCategory: ctrlWrapper(getFoodsCategory),
};
