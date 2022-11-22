const { Incident, User, Item } = require("../models/");
const sequelize = require("sequelize");
const Op = sequelize.Op;

//SIN TERMINAR!

exports.getIncident = async (id) => {
  const incident = await Incident.findByPk(id, {
    include: [
      {
        association: Incident.Item,
      },
    ],
  });
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
  const incidents = await Incident.findAll({
    include: [
      {
        association: Incident.Item,
      },
    ],
  });
  return incidents;
};

exports.getByUserId = async (userId) => {
  const incidents = await Incident.findAll({ where: { userId: userId } });
  return incidents;
};

exports.getSearchedIncidents = async (filter) => {
  if (!isNumeric(filter)) {
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
    return results;
  }
};

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
