const express = require("express");
const router = express.Router();
const formData = require("express-form-data");
const { validateAuth,validateAdmin,validateSuperAdmin } = require("../middlewares/auth");
const userController = require("../controllers/userController");

// GET ALL USERS - ADMIN
router.get("/all", validateAdmin,userController.getAllUsers);

// GET USER BY ID - ADMIN
router.get("/search/:id", validateAdmin,userController.getUser);

// POST NEW USER
router.post("/", userController.createUser);

// LOGIN USER
router.post("/login", userController.loginUser);

// GET ME
router.get("/me", validateAuth, userController.getMe);

// LOGOUT USER
router.post("/logout", userController.logoutUser);

// EDIT USER
router.put("/update/:id", userController.editUser);

// DELETE USER - ADMIN
router.delete("/delete/:id", validateAdmin,userController.deleteUser);

//UPDATE USER AVATAR
router.put("/avatar/:id", formData.parse(), userController.updateUserAvatar);

module.exports = router;
