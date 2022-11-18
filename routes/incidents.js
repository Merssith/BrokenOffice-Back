const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");

// GET ALL INCIDENTS
router.get("/all", incidentController.getAllIncidents);

// GET INCIDENT
router.get("/:id", incidentController.getIncident);

// GET SEARCH INCIDENT

// PUT EDIT INCIDENT
router.put("/update/:id", incidentController.editIncident);

// POST NEW INCIDENT
router.post("/", incidentController.createIncident);

// GET INCIDENT BY USER ID
router.get("/byUser/:userId", incidentController.getByUserId);

module.exports = router;
