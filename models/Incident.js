const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./User");

class Incident extends Sequelize.Model {}

Incident.init(
  {
    status: {
      type: Sequelize.STRING,
      defaultValue: "Pending",
    },
    geoCords: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    details: {
      type: Sequelize.TEXT,
    },
    photo: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "incident",
  }
);

module.exports = Incident;
