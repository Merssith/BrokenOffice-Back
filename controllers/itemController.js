const itemService = require("../services/itemService.js");
const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/JMnx6saZk/",
});

exports.getAllItems = (req, res) => {
  itemService
    .getAllItems()
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(500).send(err));
};

exports.getItem = (req, res) => {
  const id = req.params.id;
  itemService
    .getItem(id)
    .then((item) => res.status(200).send(item))
    .catch((err) => res.status(500).send(err));
};

exports.createItem = (req, res) => {
  const item = req.body;
  itemService
    .createItem(item)
    .then((newItem) => res.status(201).send(newItem))
    .catch((err) => res.status(500).send(err));
};

exports.editItem = (req, res) => {
  const id = req.params.id;
  itemService
    .editItem(id, req.body)
    .then((updatedItem) => res.status(202).send(updatedItem))
    .catch((err) => res.status(500).send(err));
};

exports.getPredictions = (req, res) => {
  const url = req.body.ImageUrl;

  return model
  .classify({
    imageUrl: url,
  })
  .then((predictions) => {
    res.json(predictions);
  })
  .catch((e) => {
    res.status(500).send("Something went wrong!");
  });
};