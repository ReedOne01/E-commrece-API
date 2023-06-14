const item = require("../model/itemSchema");
const Auth = require("../middleware/authMiddleware");

const createItem = async (req, res) => {
  try {
    const { owner, name, description, price } = req.body;
    if (!owner || !name || !description || !price)
      throw new Error(
        "please enter the neccessary name and description required"
      );

    const newItem = await item.create(owner, name, description, price);

    res.status(201).json({
      message: "item created successfully",
      data: newItem,
    });
    console.log("item created successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("item deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) throw new Error("Invalid id");
    const _item = await item.findone({ id });
    if (_item) return `item with that ${id} not found`;

    res.status(200).json({
      status: "OK",
      data: _item,
    });
    console.log("item gotten successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await item.find();
    res.status(200).json({
      message: "success",
      lenght: items.length(),
      data: items,
    });
    console.log("item created successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateItem = (req, res) => {
  try {
    console.log("item created successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { updateItem, deleteItem, getAllItems, getItem, createItem };