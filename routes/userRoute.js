const express = require("express");
const {
  login,
  register,
  logout,
  logoutAll,
  allUser,
} = require("../controller/userController");
const router = express.Router();

router.get("/allUsers", allUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/logout", logoutAll);
router.post("/register", register);

module.exports = router;
