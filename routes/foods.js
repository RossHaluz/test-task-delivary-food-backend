const { getFoods, getFoodsCurrent, setFoodOrder } = require("../controllers/foods");

const route = require("express").Router();

route.get("/foods", getFoods);

route.get("/foods-current", getFoodsCurrent);

route.post("/food-order", setFoodOrder)

module.exports = route;
