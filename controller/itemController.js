const item = require("../model/itemSchema");
const Auth = require("../middleware/authMiddleware");

const createItem = async (req, res) => {
  const info = req.body;
  try {
    // const info = ({ name, description, price } = req.body);

    // if (!mongoose.Types.ObjectId.isValid(owner))
    // throw new Error(`no owner with name ${owner} found`);
    // if (!name || !description || !price)
    if (!info) throw new Error("please enter the neccessary required fileds");

    // const newItem = await item.create(owner, name, description, price);
    const newItem = await item.create(info);

    res.status(201).json({
      message: "item created successfully",
      // data: newItem,
      data: newItem,
    });
    console.log("item created successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await item.findByIdAndDelete(id);
    res.status(200).json({
      message: "Below item has been deleted successfully.",
      deletedItem,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) throw new Error("Invalid id");
    const _item = await item.findone({ id });
    if (!_item) return `item with that ${id} not found`;

    res.status(200).json({
      status: "item gotten successfully",
      data: _item,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// const getAllItems = async (req, res) => {
//   try {
//     const items = await item.find();
//     res.status(200).json({
//       message: "success",
//       // Total: item.length(),
//       data: items,
//     });
//     console.log("item gotten successfully");
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };
const getAllItems = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let _item;

    if (qNew) {
      _item = await item.find().sort({ createdAT: -1 }).limit(5);
    } else if (qCategory) {
      _item = await item.find().sort({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      _item = await item.find();
    }

    res.status(200).json(_item);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const itemUpdate = await item.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "item updated successfully",
      data: itemUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateItem, deleteItem, getAllItems, getItem, createItem };
