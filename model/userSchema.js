const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minLenght: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password must not contain password");
      }
    },
  },
  tokens: [
    {
      token: {
        required: [true, "please enter your token"],
        type: String,
      },
    },
  ],
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is not valid");
      }
    },
  },
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
