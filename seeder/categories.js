const categoryService = require("../services/categoryService");

const categories = [
  {
    name: "Hardware",
  },
  {
    name: "Software",
  },
  {
    name: "Other",
  },
];

async function createCategories() {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    await categoryService.createCategory(category);
  }
  console.log("CATEGORIES created");
}

module.exports = createCategories;
