const cart = require("../model/cartSchema");

const createCart = async (req, res) => {
  const info = req.body;
  if (!info) throw new Error("input the right order");
  try {
    const newCart = await cart.create(info);
    res.status(201).json({ newCart });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new Error("Invalid id");
  try {
    const deletedCart = await cart.findByIdAndDelete(id);
    res.status(204).json({
      message: "The below order has been deleted sucessfully.",
      data: deletedCart,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  try {
    const cartUpdate = await order.findByIdAndUpdate(
      id,
      {
        $set: info,
      },
      { new: true }
    );
    res.status(200).json({
      message: "order updated successfully",
      cartUpdate,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (!userId) throw new Error(`  order with is ${userId} is not found`);
    // one user can have multiple orders.
    const Order = await cart.find({ userId });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const orders = await cart.find();
    res.status(200).json({
      message: "successful",
      orders,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//GET MONTHLY INCOME
const cartStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth) - 1);
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await cart.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createCart,
  deleteCart,
  updateCart,
  getCart,
  getAllCarts,
  cartStats,
};
