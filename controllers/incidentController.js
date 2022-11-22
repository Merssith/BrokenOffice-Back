const incidentService = require("../services/incidentService.js");

exports.getAllIncidents = (req, res) => {
  // const { id, userRoleId } = req.user;
  // let role = "";
  // if (userRoleId === 1) role = "isSuperAdmin";
  // if (userRoleId === 2) role = "isAdmin";
  // if (userRoleId === 2) role = "isUser";

  // incidentService
  //   .getAllIncidents(id, role)
  incidentService
    .getAllIncidents()
    .then((incidents) => res.status(200).send(incidents))
    .catch((err) => res.status(400).send(err));
};

exports.getIncident = (req, res) => {
  const id = req.params.id;
  incidentService
    .getIncident(id)
    .then((incident) => res.status(200).send(incident))
    .catch((err) => res.status(400).send(err));
};

exports.createIncident = (req, res) => {
  const incident = req.body;
  incidentService
    .createIncident(incident)
    .then((newIncident) => res.status(201).send(newIncident))
    .catch((err) => res.status(400).send(err));
};

exports.editIncident = (req, res) => {
  const id = req.params.id;
  incidentService
    .editIncident(id, req.body)
    .then((updatedIncident) => res.send(updatedIncident))
    .catch((err) => res.status(400).send(err));
};

exports.getByUserId = (req, res) => {
  const userId = req.params.userId;
  incidentService
    .getByUserId(userId)
    .then((incidents) => res.send(incidents))
    .catch((err) => res.status(400).send(err));
};

exports.getSearchedIncidents = (req, res) => {
  const { status, id } = req.query;
  
  let filter = null
  if (status) filter=status
  if (id) filter=id
 console.log(filter)
  incidentService
    .getSearchedIncidents(filter)
    .then((searchedIncident) => res.send(searchedIncident))
    .catch((err) => res.status(400).send(err));
};

exports.deleteIncident = (req, res) => {
  const id = req.params.id;
  incidentService
    .deleteIncident(id)
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(400).send(err));
};