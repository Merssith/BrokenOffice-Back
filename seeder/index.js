const createUserRoles = require("./userRole.js");
const createOffices = require("./offices.js");
const createUsers = require("./users.js");
const createCategories = require("./categories.js");
const createItems = require("./items.js");
const createIncidents = require("./incident.js");

createUserRoles()
  .then(() => createOffices())
  .then(() => createUsers())
  .then(() => createCategories())
  .then(() => createItems())
  .then(() => createIncidents());
