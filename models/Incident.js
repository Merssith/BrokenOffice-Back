const Sequelize = require("sequelize");
const db = require("../config/db");
const Item = require("./Item");

class Incident extends Sequelize.Model {}

Incident.init(
  {
    status: {
      type: Sequelize.STRING,
      defaultValue: "PENDING",
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
    assignedToUserId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    notes: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    modelName: "incident",
  }
);

Incident.Item = Incident.belongsTo(Item);

module.exports = Incident;
