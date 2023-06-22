const {
  login,
  register,
  currentUser,
  logout,
  editUser,
} = require("../controllers/users");
const checkAuth = require("../middlewares/auth");
const update = require("../middlewares/upload");
const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", checkAuth, logout);

router.get("/current", checkAuth, currentUser);

router.put("/user-edit", checkAuth, update.single('avatar'), editUser);

module.exports = router;
