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

const addItemToFavorite = async (req, res) => {
  const { id } = req.userId;
  const { foodId } = req.params;

  const findFood = await FoodModel.findOne({ favorite: id, _id: foodId });

  if (findFood) {
    throw HttpError(409, "Food already added to your favorite");
  }
  const favoriteBook = await FoodModel.findOneAndUpdate(
    { _id: foodId },
    { $push: { favorite: id } },
    { new: true }
  );

  if (!favoriteBook) {
    throw HttpError(404);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      favoriteBook,
    },
  });
};

const getFavoriteItems = async (req, res) => {
  const { id: owner } = req.userId;
  const { page: proccessPage, limit: proccessLimit } = req.query;
  const { page, skip, limit } = pagination(proccessPage, proccessLimit);

  const totalFoods = await FoodModel.find({ favorite: owner }).count();
  const foods = await FoodModel.find({ favorite: owner }, "", {
    skip,
    limit,
  }).populate("owner");

  res.json({
    status: "success",
    code: 200,
    data: {
      totalFoods,
      page,
      totalPages: Math.ceil(totalFoods / limit),
      foods,
    },
  });
};

const deleteFavoriteItem = async (req, res) => {
  const { id } = req.userId;
  const { foodId } = req.params;

  const food = await FoodModel.findOne({ _id: foodId });
  if (!food && !food.favorite.includes(id)) {
    throw HttpError(404);
  }

  const result = await FoodModel.findOneAndUpdate(
    { _id: foodId },
    { $pull: { favorite: id } },
    { new: true }
  );

  res.json({
    status: "success",
    code: 200,
    message: "Food delete from favorite",
    result,
  });
};

module.exports = {
  getFoods: ctrlWrapper(getFoods),
  getFoodsCurrent: ctrlWrapper(getFoodsCurrent),
  setFoodOrder: ctrlWrapper(setFoodOrder),
  getCurrentOrders: ctrlWrapper(getCurrentOrders),
  getFood: ctrlWrapper(getFood),
  getFoodsCategory: ctrlWrapper(getFoodsCategory),
  addItemToFavorite: ctrlWrapper(addItemToFavorite),
  getFavoriteItems: ctrlWrapper(getFavoriteItems),
  deleteFavoriteItem: ctrlWrapper(deleteFavoriteItem),
};
