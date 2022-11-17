const express = require("express");
const router = express.Router();
const officesController = require("../controllers/officesController");

// GET ALL OFFICES - ADMIN
router.get("/all", officesController.getAllOffices);

// GET OFFICE BY ID
router.get("/:id", officesController.getOffice);

// PUT EDIT OFFICE - SUPER ADMIN
router.put("/update/:id", officesController.editOffice);

// POST NEW OFFICE - SUPER ADMIN
router.post("/", officesController.createOffice);

module.exports = router;
