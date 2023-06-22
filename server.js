require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const { default: mongoose } = require("mongoose");
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use("/auth/user/", require("./routes/userRoute"));
app.use("/", require("./routes/itemRoute"));
app.use("/order", require("./routes/orderRoute"));
app.use("/cart", require("./routes/cartRoute"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
