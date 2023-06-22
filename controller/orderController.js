const order = require("../model/orderSchema");

const createOrder = async (req, res) => {
  const info = req.body;
  if (!info) throw new Error("input the right order");
  try {
    const newOrder = await order.create(info);
    res.status(201).json({ newOrder });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new Error("Invalid id");
  try {
    const deletedOrder = await order.findByIdAndDelete(id);
    res.status(204).json({
      message: "The below order has been deleted sucessfully.",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  try {
    const orderUpdate = await order.findByIdAndUpdate(
      id,
      {
        $set: info,
      },
      { new: true }
    );
    res.status(200).json({
      message: "order updated successfully",
      orderUpdate,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (!userId) throw new Error(`  order with is ${userId} is not found`);
    // one user can have multiple orders.
    const Order = await order.find({ userId });
    res.status(200).json({ Order });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await order.find();
    res.status(200).json({
      message: "successful",
      orders,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//GET MONTHLY INCOME
const orderStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth) - 1);
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await order.aggregate([
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
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
  getAllOrders,
  orderStats,
};
