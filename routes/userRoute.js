const express = require("express");
const {
  login,
  register,
  logout,
  logoutAll,
  allUser,
  updateUser,
  deleteUser,
  stats,
} = require("../controller/userController");
const { protect, protectAndAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/allUsers", allUser);
router.post("/login", protect, login);
router.post("/logout", protect, logout);
router.post("/logout", protect, logoutAll);
router.patch("/:id", protectAndAdmin, updateUser);
router.delete("/:id", protectAndAdmin, deleteUser);
router.post("/register", register);
router.delete("/stats", protectAndAdmin, stats);

module.exports = router;
