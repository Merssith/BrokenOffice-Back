const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");
const {
  validateAuth,
  validateAdmin,
  validateSuperAdmin,
} = require("../middlewares/auth");

// GET ALL INCIDENTS
router.get("/all", incidentController.getAllIncidents);

// GET INCIDENT BY ID 
router.get("/filter/:id", validateAuth, incidentController.getIncident);

// GET SEARCH INCIDENT BY STATUS
router.get("/search", validateAuth, incidentController.getSearchedIncidents);

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

//ADD NOTE TO INICIDENT
router.post("/note/:id", validateAuth, incidentController.noteInIncident);

//SHARE AN INICIDENT
router.post("/share/:id", incidentController.shareIncident);

module.exports = router;
