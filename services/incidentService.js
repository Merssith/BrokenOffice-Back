const { Incident, User, Item } = require("../models/");

//SIN TERMINAR!

exports.getIncident = async (id) => {
  const incident = await Incident.findByPk(id);
  return incident;
};

exports.createIncident = async (incident) => {
    const newIncident = await Incident.create(incident);
    return newIncident;
  };

exports.editIncident = (id, body) => {
  return Incident.findByPk(id).then((incident) => incident.update(body));
};

exports.getAllIncidents = async () => {
  const incidents = await Incident.findAll();
  return incidents;
};





  