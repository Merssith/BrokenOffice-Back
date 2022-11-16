const userService = require("../services/userService.js");
const { generateToken } = require("../config/tokens");

exports.getAllUsers = (req, res) => {
  userService
    .getAllUsers()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
};

exports.createUser = (req, res) => {
  const user = req.body;
  userService
    .createUser(user)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.status(400).send(err));
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
    .catch((err) => res.status(401).send(String(err)));
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
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => res.status(400).send(err));
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  userService
    .deleteUser(id)
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(400).send(err));
};
