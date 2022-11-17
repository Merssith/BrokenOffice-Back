const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");


// GET ALL CATEGORIES
router.get("/all", categoryController.getAllCategories)

// GET CATEGORY
router.get("/:id", categoryController.getCategory)

// PUT EDIT CATEGORY
router.put("/update/:id", categoryController.editCategory);

// POST NEW CATEGORY
router.post("/", categoryController.createCategory);


module.exports = router;