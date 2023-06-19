const express = require("express");
const {
  login,
  register,
  logout,
  logoutAll,
  allUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const {
  protect,
  protectAndAuthorize,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/allUsers", allUser);
router.post("/login", protect, login);
router.post("/logout", protect, logout);
router.post("/logout", protect, logoutAll);
router.patch("/:id", protectAndAuthorize, updateUser);
router.delete("/:id", protectAndAuthorize, deleteUser);
router.post("/register", register);

module.exports = router;
