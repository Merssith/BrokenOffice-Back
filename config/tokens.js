const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, process.env.SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { generateToken, validateToken };
