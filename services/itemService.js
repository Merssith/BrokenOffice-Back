const Item = require("../models/Item");

exports.getAllItems = async () => {
  const items = await Item.findAll({
    include: [
      {
        association: Item.Category,
      },
    ],
  });
  return items;
};

exports.getItem = async (id) => {
  const item = await Item.findByPk(id, {
    include: [
      {
        association: Item.Category,
      },
    ],
  });
  return item;
};

exports.createItem = async (item) => {
  const newItem = await Item.create(item);
  return newItem;
};

exports.editItem = (id, body) => {
  return Item.findByPk(id).then((item) => item.update(body));
};
