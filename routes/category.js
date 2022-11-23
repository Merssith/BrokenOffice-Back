const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { validateAuth,validateAdmin,validateSuperAdmin } = require("../middlewares/auth");


// GET ALL CATEGORIES - ADMIN
router.get("/all", validateAdmin,categoryController.getAllCategories)

// GET CATEGORY - ADMIN
router.get("/:id", validateAdmin,categoryController.getCategory)

// PUT EDIT CATEGORY -  SUPER ADMIN
router.put("/update/:id", validateSuperAdmin,categoryController.editCategory);

// POST NEW CATEGORY - SUPER ADMIN
router.post("/", validateSuperAdmin,categoryController.createCategory);


module.exports = router;