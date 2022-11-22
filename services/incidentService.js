const { Incident } = require("../models/");
const userService = require("./userService");
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
  if (!incidents.length) throw 404;
  await getAssignedUser(incidents);
  return incidents;
};

exports.createIncident = async (incident) => {
  if (Object.keys(incident).length === 0) return 400;
  const newIncident = await Incident.create(incident);
  await autoAssignAnAdmin(newIncident);
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
  await getAssignedUser(incidents);
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
    await getAssignedUser(results);
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
    await getAssignedUser(results);
    return results;
  }
};

exports.assignedToMe = async (userId) => {
  const incidents = await Incident.findAll({
    where: {
      assignedToUserId: userId,
    },
    include: [
      {
        association: Incident.Item,
      },
    ],
  });
  if (!incidents) throw 404;
  return incidents;
};

// ADITIONAL SERVICE FUNCTIONS

async function autoAssignAnAdmin(incident) {
  const incidentGeoCords = incident.geoCords.split(",");
  const incidentLat = incidentGeoCords[0].replace("[", "").replace("]", "");
  const incidentLong = incidentGeoCords[1].replace("[", "").replace("]", "");
  const adminArray = await userService.getAdminsGeoCords();
  if (!adminArray.length) return await incident.update({ assignedToUserId: 0 });
  var closest = adminArray.reduce(function (prev, curr) {
    return Math.abs(curr.lat - incidentLat) <
      Math.abs(prev.lat - incidentLat) &&
      Math.abs(curr.long - incidentLong) < Math.abs(prev.long - incidentLong)
      ? curr
      : prev;
  });
  const userId = closest.adminId;
  return await incident.update({ assignedToUserId: userId });
}

async function getAssignedUser(incidentArray) {
  for (let i = 0; i < incidentArray.length; i++) {
    let userId = incidentArray[i].assignedToUserId;
    if (userId > 0) {
      let assignedUser = await userService.getAssignedUser(userId);
      incidentArray[i].dataValues.assignedToUser = assignedUser;
    }
  }
}
