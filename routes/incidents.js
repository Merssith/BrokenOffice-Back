const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");
const { validateAuth } = require("../middlewares/auth");

// GET ALL INCIDENTS
router.get("/all", incidentController.getAllIncidents);

// GET SEARCH INCIDENT BY ID / STATUS
router.get("/search", incidentController.getSearchedIncidents);

// PUT EDIT INCIDENT
router.put("/update/:id", incidentController.editIncident);

// POST NEW INCIDENT
router.post("/", incidentController.createIncident);

// GET INCIDENT BY USER ID
router.get("/byUser/:userId", incidentController.getByUserId);

// DELETE INCIDENT BY ID
router.delete("/delete/:id", incidentController.deleteIncident);

//GET INCIDENTS ASSIGNED TO ME - ADMIN
router.get("/assignedToMe", validateAuth, incidentController.assignedToMe);

module.exports = router;
