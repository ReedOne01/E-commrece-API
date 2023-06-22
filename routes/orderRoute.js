const express = require("express");
const router = express.Router();
const { protectAndAdmin } = require("../middleware/authMiddleware");
const {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
  getAllOrders,
  orderStats,
} = require("../controller/orderController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protectAndAdmin, getAllOrders);
router.get("/id", getOrder);
router.delete("/id", protectAndAdmin, deleteOrder);
router.patch("/id", updateOrder);
router.post("/addOrder", createOrder);
router.get("/", protectAndAdmin, orderStats);

module.exports = router;
