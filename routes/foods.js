const {
  getFoods,
  getFoodsCurrent,
  setFoodOrder,
  getCurrentOrders,
  getFood,
  getFoodsCategory,
  addItemToFavorite,
  getFavoriteItems,
} = require("../controllers/foods");
const checkAuth = require("../middlewares/auth");

const route = require("express").Router();

route.get("/foods", getFoods);

route.get("/foods-category", getFoodsCategory);

route.get("/foods/:foodId", getFood);

route.get("/foods-current", getFoodsCurrent);

route.post("/food-order", setFoodOrder);

route.get("/current-orders", getCurrentOrders);

route.patch("/favorite/:foodId", checkAuth, addItemToFavorite);

route.get("/favorite", checkAuth, getFavoriteItems);

module.exports = route;
