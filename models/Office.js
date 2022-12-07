const s = require("sequelize");
const db = require("../config/db");
const Item = require("./Item");

class Office extends s.Model {}

Office.init(
  {
    name: {
      type: s.STRING,
      allowNull: false,
    },
    geoCords: {
      type: s.JSON,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "office" }
);

Office.Item = Office.hasMany(Item);

module.exports = Office;
