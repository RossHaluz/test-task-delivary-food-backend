const {
  getFoods,
  getFoodsCurrent,
  setFoodOrder,
  getCurrentOrders,
  getFood,
  getFoodsCategory,
} = require("../controllers/foods");

const route = require("express").Router();

route.get("/foods", getFoods);

route.get("/foods-category", getFoodsCategory);

route.get("/foods/:foodId", getFood);

route.get("/foods-current", getFoodsCurrent);

route.post("/food-order", setFoodOrder);

route.get("/current-orders", getCurrentOrders);

module.exports = route;
