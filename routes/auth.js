const {
  login,
  register,
  currentUser,
  logout,
  editUser,
  uploadAvatar
} = require("../controllers/users");
const checkAuth = require("../middlewares/auth");
const update = require("../middlewares/upload");
const router = require("express").Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", checkAuth, logout);

router.get("/current", checkAuth, currentUser);

router.patch("/user-edit", checkAuth, editUser);

router.patch("/update-avatar", checkAuth, update.single("avatar"), uploadAvatar)

module.exports = router;
