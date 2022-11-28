const { Incident } = require("../models/");
const { getDate } = require("../utils/functions");
const userService = require("./userService");
const imageService = require("./imageService");
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
  await getUser(incidents);
  return incidents;
};

exports.createIncident = async (incident) => {
  if (Object.keys(incident).length === 0) return 400;
  if (incident.photo.length) {
    uploadedPhoto = await uploadIncidentPhoto(incident.photo);
  } else {
    uploadedPhoto = null;
  }
  if (incident.geoCords === null) {
    incident.geoCords = "";
  }
  const completeIncident = {
    status: incident.status,
    place: incident.place,
    subject: incident.subject,
    geoCords: incident.geoCords,
    details: incident.details,
    photo: uploadedPhoto,
    userId: incident.userId,
  };
  const newIncident = await Incident.create(completeIncident);
  if (incident.geoCords.length) {
    await autoAssignAnAdmin(newIncident);
  }
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
  await getUser(incidents);
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
    await getUser(results);
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
    await getUser(results);
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
  await getUser(incidents);
  return incidents;
};

exports.noteInIncident = async (id, note, user) => {
  if (isNaN(id)) throw 400;
  const incident = await Incident.findByPk(id);
  if (!incident) throw 404;
  const checkNotesInIncident = incident.notes;
  const userData = await userService.getMe(user);
  let insertedNote = {
    comment: note,
    userName: userData.fullName,
    date: getDate(),
  };
  if (checkNotesInIncident != null) {
    const notesInIncident = [...incident.notes];
    notesInIncident.push(insertedNote);
    await incident.update({ notes: notesInIncident });
  } else {
    await incident.update({ notes: [insertedNote] });
  }
  return incident;
};

// ADITIONAL SERVICE FUNCTIONS

async function autoAssignAnAdmin(incident) {
  const incidentGeoCords = incident.geoCords.split(",");
  const incidentLat = incidentGeoCords[0];
  const incidentLong = incidentGeoCords[1];
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

async function getUser(incidentArray) {
  for (let i = 0; i < incidentArray.length; i++) {
    let userId = incidentArray[i].userId;
    if (userId > 0) {
      let user = await userService.getMe(userId);
      incidentArray[i].dataValues.user = user;
    }
  }
}

async function uploadIncidentPhoto(photo) {
  try {
    const uploadedPhoto = await imageService.uploadIncidentPhoto(photo);
    return uploadedPhoto;
  } catch {
    throw 400;
  }
}
