const Category = require("../models/Category");

exports.getAllCategories = async () => {
  const categories = await Category.findAll();
  if (!categories.length) throw 404;
  return categories;
};

exports.getCategory = async (id) => {
  if (isNaN(id)) throw 400;
  const category = await Category.findByPk(id);
  if (!category) throw 404;
  return category;
};

exports.createCategory = async (category) => {
  if (Object.keys(category).length === 0) return 400;
  const newCategory = await Category.create(category);
  return newCategory;
};

exports.editCategory = async (id, body) => {
  if (isNaN(id)) throw 400;
  const category = await Category.findByPk(id);
  if (!category) throw 404;
  if (Object.keys(body).length === 0) return 400;
  await category.update(body);
  return category;
};
