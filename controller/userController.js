const bcrypt = require("bcryptjs");
const Auth = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!email || !password || !fullname)
      throw new Error("please enter necessary information");

    const existingUser = await Auth.findOne({ email });
    if (existingUser) throw new Error("user already exists");

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await Auth.create({
      email,
      password: hashPassword,
      fullname,
    });

    res.status(201).json({
      status: "success",
      message: "user registered successfully",
      token: await generateToken(user._id),
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
    const user = await Auth.findOne({ email });
    if (!user) throw new Error("user does not exist");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new Error("incorrect password");

    res.status(200).json({
      status: "success, user login successfully",
      data: user,
      token: await generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.Authorization);
    // req.Auth.tokens = req.Auth.tokens.findOne((token) => {
    //   return token.token !== req.token;
    // });
    // await req.Auth.save();
    // res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutAll = async (req, res) => {
  try {
    req.Auth.tokens = [];
    await req.Auth.save();
    res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const allUser = async (req, res) => {
  try {
    const user = await Auth.find();
    res.status(200).json({ users: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register, logout, logoutAll, allUser };
