const userService = require("../services/userService.js");
const emailService = require("../services/emailService");
const { generateToken } = require("../config/tokens");

exports.getAllUsers = (req, res) => {
  let { page } = req.query;
  userService
    .getAllUsers(page)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

exports.getUsers = (req, res) => {
  userService
    .getUsers()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  userService
    .getUser(id)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
};

exports.getFilteredUsers = (req, res) => {
  const { role, page } = req.query;
  userService
    .getFilteredUsers(role, page)
    .then((filteredUsers) => res.status(200).send(filteredUsers))
    .catch((err) => res.status(500).send(err));
};


exports.createUser = (req, res) => {
  const user = req.body;
  userService
    .createUser(user)
    .then((newUser) => {
      emailService.sendRegisterEmail(newUser);
      res.status(201).send(newUser);
    })
    .catch((err) => res.status(500).send(err));
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  userService
    .loginUser(email, password)
    .then((payload) => {
      const token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    })
    .catch((err) => res.status(500).send(err));
};

exports.getMe = (req, res) => {
  res.send(req.user);
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

exports.editUser = (req, res) => {
  const id = req.params.id;
  userService
    .editUser(id, req.body)
    .then((updatedUser) => res.status(202).send(updatedUser))
    .catch((err) => res.status(500).send(err));
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  userService
    .deleteUser(id)
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(500).send(err));
};

exports.updateUserAvatar = (req, res) => {
  const id = req.params.id;
  const avatar = req.files.avatar.path;
  userService
    .updateUserAvatar(id, avatar)
    .then((updatedUser) => res.status(202).send(updatedUser))
    .catch((err) => res.status(500).send(err));
};