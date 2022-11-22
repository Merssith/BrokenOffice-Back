const UserRole = require("../models/UserRole");

exports.getAllUserRole = async () => {
  const userRoles = await UserRole.findAll();
  if (!userRoles) throw 404;
  return userRoles;
};

exports.getUserRole = async (id) => {
  if (isNaN(id)) throw 400;
  const userRole = await UserRole.findByPk(id);
  if (!userRole) throw 404;
  return userRole;
};

exports.createUserRole = async (userRole) => {
  if (Object.keys(userRole).length === 0) return 400;
  const newUserRole = await UserRole.create(userRole);
  return newUserRole;
};

exports.editUserRole = async (id, body) => {
  if (isNaN(id)) throw 400;
  const userRole = await UserRole.findByPk(id);
  if (!userRole) throw 404;
  if (Object.keys(body).length === 0) return 400;
  await userRole.update(body);
  return userRole;
};
