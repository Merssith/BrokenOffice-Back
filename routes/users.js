const express = require("express");
const router = express.Router();

const { generateToken, validateToken } = require("../config/tokens");

const User = require("../models/User");

router.get("/all", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch(next);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone,
        geoCords: user.geoCords,
        avatar: user.avatar,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});

router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { user } = validateToken(token);

  if (!user) return res.sendStatus(401);
  res.send(user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});


//rechequear, al updatear no elimina contraseña
router.put("/update/", (req, res, next) => {
  const { id } = req.body;
  User.update(req.body, {
    where: { id: id },
    returning: true,
  })
    .then((user) => {
      res.send(user[1][0]);
    })
    .catch(next);
});

router.delete("/delete/:id", (req, res, next) => {
  const { id } = req.params;
  User.destroy({ where: { id: id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
