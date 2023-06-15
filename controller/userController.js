const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (!email || !password || !fullname || !confirmPassword)
      throw new Error("please enter necessary information");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("user already exists");

    //The password has been hashed/encrypted from the user schema

    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password,
      fullname,
      confirmPassword,
    });

    res.status(201).json({
      status: "success",
      token: await generateToken(user._id),
      message: "user registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("email or password cannot be empty");

    const user = await User.findOne({ email }).select("+password");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!user || !comparePassword) throw new Error("incorrect password");

    res.status(200).json({
      status: "success, user login successfully",
      token: User.token,
      data: user,
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.user.email);
    req.user.tokens = req.user.tokens.findOne((token) => {
      return token.token !== req.token;
    });
    // await req.User.save();
    // res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutAll = async (req, res) => {
  try {
    req.User.tokens = [];
    await req.User.save();
    res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allUser = async (req, res) => {
  try {
    const user = await User.find().select("+password");
    res.status(200).json({
      Total: user.length,
      users: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register, logout, logoutAll, allUser };
