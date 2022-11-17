const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dsdiadotw",
  api_key: "296263448996691",
  api_secret: "IyFGX5zShzjTj3QURvMCtkYJuDs",
});

const cloudimage = cloudinary;

module.exports = { cloudimage };
