const express = require("express");
const router = express.Router();

const users = require("./users");
const incidents = require("./incidents")
const userRole = require('./userRole')

router.use("/users", users);
router.use("/incidents", incidents);
router.use("/userRole", userRole);

module.exports = router;
