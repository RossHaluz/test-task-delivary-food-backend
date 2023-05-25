const { getFoods, getFoodsCurrent } = require("../controllers/foods");

const route = require("express").Router();

route.get("/foods", getFoods);

route.get("/foods-current", getFoodsCurrent);

module.exports = route;
