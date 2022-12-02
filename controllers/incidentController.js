const incidentService = require("../services/incidentService.js");
const emailService = require("../services/emailService");

exports.getAllIncidents = (req, res) => {
  let { page } = req.query;
  incidentService
    .getAllIncidents(page)
    .then((incidents) => res.status(200).send(incidents))
    .catch((err) => res.status(500).send(err));
};

exports.getIncident = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const userRoleId = req.user.userRoleId;
  incidentService
    .getIncident(id, userId, userRoleId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

exports.createIncident = (req, res) => {
  const incident = req.body;
  incidentService
    .createIncident(incident)
    .then((newIncident) => {
      emailService.sendNewIncidentEmail(newIncident);
      emailService.sendIncidentAssignedEmail(newIncident);
      res.status(201).send(newIncident);
    })
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
  const { status, id, page } = req.query;
  const userId = req.user.id;
  const userRoleId = req.user.userRoleId;

  incidentService
    .getSearchedIncidents(status, page)
    .then((searchedIncident) => res.status(200).send(searchedIncident))
    .catch((err) => res.status(500).send(err));
};

exports.assignedToMe = (req, res) => {
  const userId = req.user.id;
  let { page, status } = req.query;
  incidentService
    .assignedToMe(userId, status, page)
    .then((incidents) => res.status(200).send(incidents))
    .catch((err) => res.status(500).send(err));
};

exports.noteInIncident = (req, res) => {
  const incidentId = req.params.id;
  const note = req.body.note;
  const userId = req.user.id;
  incidentService
    .noteInIncident(incidentId, note, userId)
    .then((incident) => {
      emailService.checkSendIncidentNewReplyEmail(incident, userId);
      res.status(200).send(incident);
    })
    .catch((err) => res.status(500).send(err));
};

exports.shareIncident = (req, res) => {
  const incidentId = req.params.id;
  const email = req.body.email;
  incidentService
    .getIncident(incidentId)
    .then((incident) => {
      emailService.sendIncidentShareEmail(incident, email);
      res.sendStatus(200);
    })
    .catch((err) => res.status(500).send(err));
};
