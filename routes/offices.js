const express = require("express");
const router = express.Router();
const officesController = require("../controllers/officesController");
const { validateAuth,validateAdmin,validateSuperAdmin } = require("../middlewares/auth");

// GET ALL OFFICES - ADMIN
router.get("/all", validateAdmin,officesController.getAllOffices);

// GET OFFICE BY ID - ADMIN
router.get("/:id", validateAdmin,officesController.getOffice);

// PUT EDIT OFFICE - SUPER ADMIN
router.put("/update/:id", validateSuperAdmin,officesController.editOffice);

// POST NEW OFFICE - SUPER ADMIN
router.post("/", validateSuperAdmin,officesController.createOffice);

module.exports = router;
