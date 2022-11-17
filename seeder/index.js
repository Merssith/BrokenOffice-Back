const createUserRole = require("./userRole.js");
const createUsers = require("./users.js");

createUserRole().then(() => createUsers());
