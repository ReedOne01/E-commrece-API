const mongoose = require("mongoose");
// const ObjectID = mongoose.schema.Types.ObjectId;

const orderSchema = mongoose.model(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        itemID: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestapms: true }
);

module.exports = mongoose.model("Order", orderSchema);
