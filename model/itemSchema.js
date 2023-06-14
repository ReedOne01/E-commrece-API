const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const itemSchema = mongoose.Schema({
  owner: {
    type: ObjectID,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  descriptiom: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Item", itemSchema);
