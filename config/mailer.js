const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST_NODEMAILER,
  port: process.env.PORT_NODEMAILER,
  secure: true,
  auth: {
    user: process.env.USER_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

transporter.verify().then(() => {
  console.log("Email Service ON");
});

module.exports = { transporter };
