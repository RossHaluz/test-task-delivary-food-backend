const {
  login,
  register,
  currentUser,
  logout,
  editUser,
} = require("../controllers/users");
const checkAuth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", checkAuth, logout);

router.get("/current", checkAuth, currentUser);

router.patch("/user-edit", checkAuth, editUser);

module.exports = router;
