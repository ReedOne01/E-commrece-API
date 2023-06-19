const mongoose = require("mongoose");
// const ObjectID = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema({
  // owner: {
  //   type: ObjectID,
  //   required: true,
  //   ref: "User",
  //   trim: true,
  // },
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: Number,
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Item", itemSchema);
