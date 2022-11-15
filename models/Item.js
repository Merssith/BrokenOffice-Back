const Sequelize = require("sequelize");
const db = require("../config/db");

class Item extends Sequelize.Model {}

Item.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    brand: {
      type: Sequelize.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "item",
  }
);

module.exports = Item;
