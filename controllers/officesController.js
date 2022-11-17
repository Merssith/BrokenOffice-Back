const officesService = require("../services/officesService.js");

exports.getAllOffices = (req, res) => {
  officesService
    .getAllOffices()
    .then((offices) => res.status(200).send(offices))
    .catch((err) => res.status(400).send(err));
};

exports.getOffice = (req, res) => {
  const id = req.params.id;
  officesService
    .getOffice(id)
    .then((office) => res.status(200).send(office))
    .catch((err) => res.status(400).send(err));
};

exports.editOffice = (req, res) => {
  const id = req.params.id;
  officesService
    .editOffice(id, req.body)
    .then((updatedOffice) => res.status(201).send(updatedOffice))
    .catch((err) => res.status(400).send(err));
};

exports.createOffice = (req, res) => {
  const office = req.body;
  officesService
    .createOffice(office)
    .then((newOffice) => res.send(newOffice))
    .catch((err) => res.status(400).send(err));
};
