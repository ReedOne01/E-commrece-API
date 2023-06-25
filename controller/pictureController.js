const Picture = require("../model/pictureSchema");
const upload_To_Cloudinary = require("../config/cloudinary");

const uploadPicture = async (req, res) => {
  const { picture, name } = req.body;
  try {
    if (!picture || !name) throw new Error("Please provide a picture and name");

    const data = await upload_To_Cloudinary(name, picture);
    const result = await Picture.create({ image_url: data.secure_url });

    if (!result) throw new Error("something went wrong");

    res.status(200).json({
      message: "profile picture uploaded successfully",
      result,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { uploadPicture };
