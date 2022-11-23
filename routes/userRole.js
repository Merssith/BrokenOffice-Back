const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");
const { validateAuth,validateAdmin,validateSuperAdmin } = require("../middlewares/auth");


// GET ALL USER ROLE - ADMIN
router.get("/all", validateAdmin,userRoleController.getAllUserRole)

// GET USER ROLE - SUPER ADMIN
router.get("/:id", validateAdmin ,userRoleController.getUserRole)

// PUT EDIT USER ROLE - SUPER ADMIN
router.put("/update/:id", validateAdmin,userRoleController.editUserRole);

// POST NEW USER ROLE - SUPER ADMIN
router.post("/", validateAdmin,userRoleController.createUserRole);


module.exports = router;