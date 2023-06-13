const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  fullname: {
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
    validate: {
      validator: function (value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("password must not contain password");
      },
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "password is not the same",
    },
  },
  tokens: [
    {
      token: {
        required: true,
        type: String,
      },
    },
  ],
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "please enter your email address"],
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
