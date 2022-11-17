const Category = require("../models/Category");


  exports.getAllCategories = async () => {
    const categories = await Category.findAll();
    return categories;
  };

  exports.getCategory = async (id) => {
    const category = await Category.findByPk(id)
    return category;
  }
  
  exports.createCategory = async (category) => {
    const newCategory = await Category.create(category);
    return newCategory;
  };

  exports.editCategory = (id, body) => {
    return Category.findByPk(id).then((category) => category.update(body));
  };