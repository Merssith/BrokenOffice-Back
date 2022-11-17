const express = require("express");
const router = express.Router();

const users = require("./users");
const incidents = require("./incidents");
const userRole = require("./userRole");
const offices = require("./offices.js");

router.use("/users", users);
router.use("/incidents", incidents);
router.use("/userRole", userRole);
router.use("/offices", offices);

module.exports = router;
