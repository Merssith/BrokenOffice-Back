const { Incident } = require("../models/");
const { getDate } = require("../utils/functions");
const userService = require("./userService");
const imageService = require("./imageService");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const itemService = require("./itemService.js");

exports.getAllIncidents = async (page) => {
  let skipIncidents = page;
  skipIncidents >= 1 ? (skipIncidents -= 1) : null;

  const incidentsRequest = await Incident.findAndCountAll({
    include: [
      {
        association: Incident.Item,
      },
    ],
    limit: 8,
    offset: page ? skipIncidents * 8 : 0,
  });

  const { totalIncidents, incidents, totalPages, currentPage } = getPagingData(
    incidentsRequest,
    page
  );

  if (!incidentsRequest.rows) throw 404;
  await getAssignedUser(incidentsRequest.rows);
  await getUser(incidentsRequest.rows);
  return { totalIncidents, incidents, totalPages, currentPage };
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

  const item = await predictItem(uploadedPhoto, incident.userId);

  const completeIncident = {
    status: incident.status,
    place: incident.place,
    subject: incident.subject,
    geoCords: incident.geoCords,
    details: incident.details,
    photo: uploadedPhoto,
    itemId: item,
    userId: incident.userId,
  };
  const newIncident = await Incident.create(completeIncident);
  if (incident.geoCords != "") {
    await autoAssignAnAdmin(newIncident);
  } else {
    newIncident.update({ assignedToUserId: 1 });
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

exports.getByUserId = async (userId, page) => {
  if (isNaN(userId)) throw 400;

  let skipIncidents = page;
  skipIncidents >= 1 ? (skipIncidents -= 1) : null;

  const incidentsRequest = await Incident.findAndCountAll({
    where: { userId },
    limit: 8,
    offset: page ? skipIncidents * 8 : 0,
  });

  const { totalIncidents, incidents, totalPages, currentPage } = getPagingData(
    incidentsRequest,
    page
  );
  if (!incidentsRequest.rows) throw 404;
  await getAssignedUser(incidentsRequest.rows);
  await getUser(incidentsRequest.rows);
  return { totalIncidents, incidents, totalPages, currentPage };
};

exports.deleteIncident = async (id) => {
  if (isNaN(id)) throw 400;
  const incident = await Incident.findByPk(id);
  if (!incident) throw 404;
  return Incident.destroy({ where: { id } });
};

exports.getSearchedIncidents = async (filter, userId, userRoleId, page) => {
  if (!filter) throw 400;

  let skipIncidents = page;
  skipIncidents >= 1 ? (skipIncidents -= 1) : null;

  if (isNaN(filter)) {
    const incidentsRequest = await Incident.findAndCountAll({
      where: {
        status: filter,
      },
      include: [
        {
          association: Incident.Item,
        },
      ],
      limit: 8,
      offset: page ? skipIncidents * 8 : 0,
    });
    if (!incidentsRequest) throw 404;
    const { totalIncidents, incidents, totalPages, currentPage } =
      getPagingData(incidentsRequest, page);
    await getAssignedUser(incidentsRequest.rows);
    await getUser(incidentsRequest.rows);
    return { totalIncidents, incidents, totalPages, currentPage };
  } else {
    const incidentsRequest = await Incident.findAndCountAll({
      where: {
        id: filter,
      },
      include: [
        {
          association: Incident.Item,
        },
      ],
      limit: 8,
      offset: page ? skipIncidents * 8 : 0,
    });
    if (!incidentsRequest) throw 404;
    if (
      incidentsRequest.rows[0].userId !== userId &&
      userRoleId > 1 &&
      userId !== incidentsRequest.rows[0].assignedToUserId
    )
      throw 401;
    const { totalIncidents, incidents, totalPages, currentPage } =
      getPagingData(incidentsRequest, page);
    await getAssignedUser(incidentsRequest.rows);
    await getUser(incidentsRequest.rows);
    return { totalIncidents, incidents, totalPages, currentPage };
  }
};

exports.assignedToMe = async (userId, page) => {
  let skipIncidents = page;
  skipIncidents >= 1 ? (skipIncidents -= 1) : null;

  const incidentsRequest = await Incident.findAndCountAll({
    where: { assignedToUserId: userId },
    include: [
      {
        association: Incident.Item,
      },
    ],
    limit: 8,
    offset: page ? skipIncidents * 8 : 0,
  });

  const { totalIncidents, incidents, totalPages, currentPage } = getPagingData(
    incidentsRequest,
    page
  );

  if (!incidentsRequest.rows) throw 404;
  await getUser(incidentsRequest.rows);
  return { totalIncidents, incidents, totalPages, currentPage };
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
  const incidentLat = incident.geoCords.lat;
  const incidentLong = incident.geoCords.lng;
  const adminArray = await userService.getAdminsGeoCords();
  if (!adminArray.length) return await incident.update({ assignedToUserId: 0 });
  var closest = adminArray.reduce(function (prev, curr) {
    let currentCords =
      Math.abs(curr.lat - incidentLat) + Math.abs(curr.long - incidentLong);
    let previousCords =
      Math.abs(prev.lat - incidentLat) + Math.abs(prev.long - incidentLong);
    return currentCords < previousCords ? curr : prev;
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

async function predictItem(photo, user) {
  const predictedItems = await itemService.getPredictions(photo);
  const predictedItem = predictedItems[0].class.split(" ");
  const device = predictedItem[0];
  const brand = predictedItem[1];
  const model = predictedItem[2];
  const color = predictedItem[3];
  const userId = user;
  const userItems = await itemService.getItemsbyUserId(userId);
  if (!userItems) return null;

  const result = userItems.filter(
    (item) =>
      item.dataValues.device === device &&
      item.dataValues.brand === brand &&
      item.dataValues.model === model &&
      item.dataValues.color === color
  );

  const alternativeResult = userItems.filter(
    (item) => item.dataValues.device === device
  );

  if (result.length) {
    return result[0].dataValues.id;
  } else if (alternativeResult.length) {
    return alternativeResult[0].dataValues.id;
  } else {
    return null;
  }
}

const getPagingData = (data, page) => {
  const { count: totalIncidents, rows: incidents } = data;
  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(totalIncidents / 8);
  return { totalIncidents, incidents, totalPages, currentPage };
};
