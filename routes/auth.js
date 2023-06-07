const {
  login,
  register,
  currentUser,
  logout,
} = require("../controllers/users");
const checkAuth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", checkAuth, logout);

router.get("/current", checkAuth, currentUser);

module.exports = router;
