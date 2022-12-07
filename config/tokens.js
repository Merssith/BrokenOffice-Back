const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, process.env.SECRET, {
    expiresIn: "3d",
  });
  return token;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(
    { user: payload },
    process.env.SECRET_REFRESHTOKEN,
    {
      expiresIn: "10d",
    }
  );
  return refreshToken;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

const validateRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.SECRET_REFRESHTOKEN);
};

module.exports = {
  generateToken,
  validateToken,
  generateRefreshToken,
  validateRefreshToken,
};
