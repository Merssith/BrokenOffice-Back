const s = require("sequelize");
const db = require("../config/db");

class UserRole extends s.Model {
  
}

UserRole.init(
  {
    name: {
      type: s.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "userRole" }
);


module.exports = UserRole;