const userRoleService = require("../services/userRoleService.js");

exports.getAllUserRole = (req, res) => {
  userRoleService
    .getAllUserRole()
    .then((userRoles) => res.status(200).send(userRoles))
    .catch((err) => res.status(500).send(err));
};

exports.getUserRole = (req, res) => {
  const id = req.params.id;
  userRoleService
    .getUserRole(id)
    .then((userRole) => res.status(200).send(userRole))
    .catch((err) => res.status(500).send(err));
};

exports.createUserRole = (req, res) => {
  const userRole = req.body;
  userRoleService
    .createUserRole(userRole)
    .then((newUserRole) => res.status(201).send(newUserRole))
    .catch((err) => res.status(500).send(err));
};

exports.editUserRole = (req, res) => {
  const id = req.params.id;
  userRoleService
    .editUserRole(id, req.body)
    .then((updatedUserRole) => res.status(202).send(updatedUserRole))
    .catch((err) => res.status(400).send(err));
};
