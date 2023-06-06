const { login, register, currentUser } = require("../controllers/users");
const checkAuth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

router.get("/current", checkAuth, currentUser);

module.exports = router;
