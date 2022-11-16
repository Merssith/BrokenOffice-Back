const UserRole = require("../models/UserRole");


  exports.getAllUserRole = async () => {
    const userRoles = await UserRole.findAll();
    return userRoles;
  };

  exports.getUserRole = async (id) => {
    const userRole = await UserRole.findByPk(id)
    return userRole;
  }
  
  exports.createUserRole= async (userRole) => {
    const newUserRole = await UserRole.create(userRole);
    return newUserRole;
  };

  exports.editUserRole = (id, body) => {
    return UserRole.findByPk(id).then((userRole) => userRole.update(body));
  };