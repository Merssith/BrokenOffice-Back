const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const { validateAuth,validateAdmin,validateSuperAdmin } = require("../middlewares/auth");

// GET ALL ITEMS - ADMIN
router.get("/all", validateAdmin,itemController.getAllItems)

// GET ITEM - ADMIN
router.get("/:id", validateAdmin,itemController.getItem)

// POST ITEM AND GET PREDICTIONS FROM MODEL
router.post("/image/classify", itemController.getPredictions)

// PUT EDIT ITEM - ADMIN
router.put("/update/:id", validateAdmin,itemController.editItem);

// POST NEW ITEM - ADMIN
router.post("/", validateAdmin,itemController.createItem);



module.exports = router;