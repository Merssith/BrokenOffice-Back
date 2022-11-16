const Sequelize = require("sequelize");
const db = require("../config/db");

class Incident extends Sequelize.Model {}

Incident.init(
  {
    status: {
      type: Sequelize.STRING,
      allowNull: false,
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
  },
  {
    sequelize: db,
    modelName: "incident",
  }
);

module.exports = Incident;
