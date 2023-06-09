const mongoose = require("mongoose");
const ObjectID = mongoose.schema.Type.ObjectId;

const itemSchema = mongoose.schema({
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
  timestamps: true,
});

module.exports = mongoose.model("Item", itemSchema);
