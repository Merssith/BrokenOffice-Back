const Sequelize = require("sequelize");
const db = require("../config/db");
const Item = require("./Item");

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
    place: {
      type: Sequelize.STRING,
    },
    subject: {
      type: Sequelize.STRING(20),
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

Incident.Item = Incident.belongsTo(Item);

module.exports = Incident;
