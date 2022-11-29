const incidentService = require("../services/incidentService.js");

exports.getAllIncidents = (req, res) => {
  incidentService
    .getAllIncidents()
    .then((incidents) => res.status(200).send(incidents))
    .catch((err) => res.status(500).send(err));
};

exports.createIncident = (req, res) => {
  const incident = req.body;
  incidentService
    .createIncident(incident)
    .then((newIncident) => res.status(201).send(newIncident))
    .catch((err) => res.status(500).send(err));
};

exports.editIncident = (req, res) => {
  const id = req.params.id;
  incidentService
    .editIncident(id, req.body)
    .then((updatedIncident) => res.status(202).send(updatedIncident))
    .catch((err) => res.status(500).send(err));
};

exports.getByUserId = (req, res) => {
  const userId = req.params.userId;
  let { page } = req.query;
  incidentService
    .getByUserId(userId, page)
    .then((incidents) => res.status(200).send(incidents))
    .catch((err) => res.status(500).send(err));
};

exports.deleteIncident = (req, res) => {
  const id = req.params.id;
  incidentService
    .deleteIncident(id)
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(500).send(err));
};

exports.getSearchedIncidents = (req, res) => {
  const { status, id } = req.query;
  const userId = req.user.id
  const userRoleId = req.user.userRoleId

  let filter = null;
  if (status) filter = status;
  if (id) filter = id;
  incidentService
    .getSearchedIncidents(filter, userId, userRoleId)
    .then((searchedIncident) => res.status(200).send(searchedIncident))
    .catch((err) => res.status(500).send(err));
};

exports.assignedToMe = (req, res) => {
  const userId = req.user.id;
  incidentService
    .assignedToMe(userId)
    .then((incidents) => res.status(200).send(incidents))
    .catch((err) => res.status(500).send(err));
};

exports.noteInIncident = (req, res) => {
  const incidentId = req.params.id;
  const note = req.body.note;
  const userId = req.user.id;
  incidentService
    .noteInIncident(incidentId, note, userId)
    .then((incident) => res.status(200).send(incident))
    .catch((err) => res.status(500).send(err));
};
