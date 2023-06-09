const mongoose = require("mongoose");
const ObjectID = mongoose.schema.Types.ObjectId;

const cartSchema = mongoose.model({
  owner: {
    type: ObjectID,
    required: true,
    ref: "User",
  },
  items: [
    {
      itemID: {
        type: ObjectID,
        required: true,
        ref: "Item",
      },
      name: String,
      quantity: {
        type: Number,
        min: 1,
        default: 1,
        price: Number,
      },
    },
  ],
  bill: {
    type: Number,
    default: 0,
    required: true,
  },
});