const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadImage = async (name, picture) => {
  const result = await cloudinary.uploader.upload(picture.tempFilePath, {
    public_id: name,
    resource_type: "auto",
    folder: "profile-picture",
  });
  return result;
};

module.exports = { uploadImage };
