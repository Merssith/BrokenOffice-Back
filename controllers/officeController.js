const officeService = require("../services/officeService.js");

exports.getAllOffice = (req, res) => {
    officeService
    .getAllOffice()
    .then((offices) => res.status(200).send(offices))
    .catch((err) => res.status(400).send(err));
};

exports.getOffice = (req, res) => {
  const id = req.params.id;
  officeService
  .getOffice(id)
  .then((office) => res.status(200).send(office))
  .catch((err) => res.status(400).send(err));
}

exports.createOffice = (req, res) => {
  const office = req.body;
  officeService
    .createOffice(office)
    .then((newOffice) => res.status(201).send(newOffice))
    .catch((err) => res.status(400).send(err));
};

exports.editOffice = (req, res) => {
  const id = req.params.id;
  officeService
    .editOffice(id, req.body)
    .then((updatedOffice) => res.send(updatedOffice))
    .catch((err) => res.status(400).send(err));
};
