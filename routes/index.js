const express = require("express");
const router = express.Router();

const users = require("./users");
const incidents = require("./incidents")
const userRole = require('./userRole')
const item = require('./item')
const category = require('./category')

router.use("/users", users);
router.use("/incidents", incidents);
router.use("/userRole", userRole);
router.use('/item', item)
router.use('/category', category)

module.exports = router;
