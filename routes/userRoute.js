const express = require("express");
const router = express.Router();
const { login } = require("../controller/userController");

router.post("/auth/login", login);
