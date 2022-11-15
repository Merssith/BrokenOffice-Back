const Sequelize = require("sequelize");

const db = new Sequelize("broken-office", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
