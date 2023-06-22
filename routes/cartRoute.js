const express = require("express");
const router = express.Router();
const {
  createCart,
  deleteCart,
  updateCart,
  getCart,
  getAllCarts,
  cartStats,
} = require("../controller/cartController");

router.get("/allUsers", getAllCarts);
router.get("/getUser/id", getCart);
router.patch("/:id", updateCart);
router.delete("/:id", deleteCart);
router.post("/create", createCart);
router.delete("/stats", cartStats);

module.exports = router;
