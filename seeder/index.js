const createUsers = require("./users.js");

createUsers();
//When we have more to seed, we will add a promise to execute the next seed. The seeds are going to have an order, that's why it is necessary to finish a previous one to start a new one.
//  .then(() => createUserRole())
