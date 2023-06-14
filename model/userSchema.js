const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    select: false,
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

  token: {
    required: true,
    type: String,
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "please enter your email address"],
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.pre("save", async function (next) {
  //Only runs if the password is modified
  if (!this.isModified("password")) return next();

  // hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete comfirmPassword field
  this.confirmPassword = undefined;
  next();
});
module.exports = mongoose.model("User", userSchema);
