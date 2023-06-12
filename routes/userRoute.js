const express = require("express");
const {
  login,
  register,
  logout,
  logoutAll,
  allUser,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/allUsers", allUser);
router.post("/login", protect, login);
router.post("/logout", protect, logout);
router.post("/logout", protect, logoutAll);
router.post("/register", register);

module.exports = router;
