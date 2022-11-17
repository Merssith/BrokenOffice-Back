const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");


// GET ALL OFFICE
router.get("/all", officeController.getAllOffice)

// GET OFFICE
router.get("/:id", officeController.getOffice)

// PUT EDIT OFFICE
router.put("/update/:id", officeController.editOffice);

// POST NEW OFFICE
router.post("/", officeController.createOffice);


module.exports = router;