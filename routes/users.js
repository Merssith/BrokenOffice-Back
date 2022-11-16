const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middlewares/auth");
const userController = require("../controllers/userController");

// GET ALL USERS
router.get("/all", userController.getAllUsers);

// GET USER
router.get("/:id", userController.getUser)

// POST NEW USER
router.post("/", userController.createUser);

// LOGIN USER
router.post("/login", userController.loginUser);

// GET ME
router.get("/me", validateAuth, userController.getMe);

// LOGOUT USER
router.get("/logout", userController.logoutUser);

// EDIT USER
router.put("/update/:id", userController.editUser);

// DELETE USER
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
