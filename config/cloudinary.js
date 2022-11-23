const cloudinary = require("cloudinary");
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

// cloudinary.config({
//   cloud_name: "dsdiadotw",
//   api_key: "296263448996691",
//   api_secret: "IyFGX5zShzjTj3QURvMCtkYJuDs",
// });

const cloudimage = cloudinary;

module.exports = { cloudimage };
