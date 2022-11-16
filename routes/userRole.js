const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");


// GET ALL USER ROLE
router.get("/all", userRoleController.getAllUserRole)

// GET USER ROLE 
router.get("/:id", userRoleController.getUserRole)

// PUT EDIT USER ROLE
router.put("/update/:id", userRoleController.editUserRole);

// POST NEW USER ROLE
router.post("/", userRoleController.createUserRole);


module.exports = router;