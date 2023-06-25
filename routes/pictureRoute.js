const express = require("express");
const router = express.Router();

const { uploadPicture } = require("../controller/pictureController");

router.post("/", uploadPicture);
module.exports = router;
