const categoryService = require("../services/categoryService.js");

exports.getAllCategories = (req, res) => {
  categoryService
    .getAllCategories()
    .then((categories) => res.status(200).send(categories))
    .catch((err) => res.status(500).send(err));
};

exports.getCategory = (req, res) => {
  const id = req.params.id;
  categoryService
    .getCategory(id)
    .then((category) => res.status(200).send(category))
    .catch((err) => res.status(500).send(err));
};

exports.createCategory = (req, res) => {
  const category = req.body;
  categoryService
    .createCategory(category)
    .then((newCategory) => res.status(201).send(newCategory))
    .catch((err) => res.status(500).send(err));
};

exports.editCategory = (req, res) => {
  const id = req.params.id;
  categoryService
    .editCategory(id, req.body)
    .then((updatedCategory) => res.status(202).send(updatedCategory))
    .catch((err) => res.status(500).send(err));
};
