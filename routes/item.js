const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");


// GET ALL ITEMS
router.get("/all", itemController.getAllItems)

// GET ITEM
router.get("/:id", itemController.getItem)

// POST ITEM AND GET PREDICTIONS FROM MODEL

router.post("/image/classify", itemController.getPredictions)

// PUT EDIT ITEM
router.put("/update/:id", itemController.editItem);

// POST NEW ITEM
router.post("/", itemController.createItem);



module.exports = router;