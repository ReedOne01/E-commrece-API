const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createItem,
  deleteItem,
  getItem,
  getAllItems,
  updateItem,
} = require("../controller/itemController");

const router = express.Router();

router.post("/items", protect, createItem);
router.delete("/items/id", protect, deleteItem);
router.get("/items", getAllItems);
router.get("/items/id", getItem);
router.patch("/items/id", updateItem);

module.exports = router;
