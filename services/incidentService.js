const { Incident, User, Item } = require("../models/");
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.getAllIncidents = async () => {
  const incidents = await Incident.findAll({
    include: [
      {
        association: Incident.Item,
      },
    ],
  });
  if (!incidents) throw 404;
  return incidents;
};

exports.createIncident = async (incident) => {
  if (Object.keys(incident).length === 0) return 400;
  const newIncident = await Incident.create(incident);
  return newIncident;
};

exports.editIncident = async (id, body) => {
  if (isNaN(id)) throw 400;
  const incident = await Incident.findByPk(id);
  if (!incident) throw 404;
  if (Object.keys(body).length === 0) return 400;
  await incident.update(body);
  return incident;
};

exports.getByUserId = async (userId) => {
  if (isNaN(userId)) throw 400;
  const incidents = await Incident.findAll({ where: { userId: userId } });
  if (!incidents.length) throw 404;
  return incidents;
};

exports.deleteIncident = async (id) => {
  if (isNaN(id)) throw 400;
  const incident = await Incident.findByPk(id);
  if (!incident) throw 404;
  return Incident.destroy({ where: { id } });
};

exports.getSearchedIncidents = async (filter) => {
  if (!filter) throw 400;
  if (isNaN(filter)) {
    const results = await Incident.findAll({
      where: {
        status: filter,
      },
      include: [
        {
          association: Incident.Item,
        },
      ],
    });
    if (!results.length) throw 404;
    return results;
  } else {
    const results = await Incident.findAll({
      where: {
        id: filter,
      },
      include: [
        {
          association: Incident.Item,
        },
      ],
    });
    if (!results.length) throw 404;
    return results;
  }
};
