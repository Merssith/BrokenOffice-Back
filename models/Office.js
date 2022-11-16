const s = require("sequelize");
const db = require("../config/db");

class Office extends s.Model {
  
}

Office.init(
  {
    name: {
      type: s.STRING,
      allowNull: false,
    },
    geoCords: {
      type: s.STRING,
      allowNull: false,
    }
  },
  { sequelize: db, modelName: "office" }
);


module.exports = Office;
