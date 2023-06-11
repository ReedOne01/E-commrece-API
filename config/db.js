const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    const res = await mongoose.connect(uri);
    console.log(`mongoDB connected successfully : ${res.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
