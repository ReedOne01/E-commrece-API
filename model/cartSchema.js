const mongoose = require("mongoose");
// const ObjectID = mongoose.schema.Types.ObjectId;

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        itemID: {
          type: String,
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  { timestapms: true }
);

module.exports = mongoose.model("Cart", cartSchema);
