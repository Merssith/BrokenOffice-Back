const Item = require("../models/Item");
const { model } = require("../config/teachableMachineModel");

exports.getAllItems = async () => {
  const items = await Item.findAll({
    include: [
      {
        association: Item.Category,
      },
    ],
  });
  if (!items.length) throw 404;
  return items;
};

exports.getItem = async (id) => {
  if (isNaN(id)) throw 400;
  const item = await Item.findByPk(id, {
    include: [
      {
        association: Item.Category,
      },
    ],
  });
  if (!item) throw 404;
  return item;
};

exports.createItem = async (item) => {
  if (Object.keys(item).length === 0) throw 400;
  const newItem = await Item.create(item);
  return newItem;
};

exports.editItem = async (id, body) => {
  if (isNaN(id)) throw 400;
  const item = await Item.findByPk(id);
  if (!item) throw 404;
  if (Object.keys(body).length === 0) throw 400;
  await item.update(body);
  return item;
};

exports.getPredictions = async (url) => {
  try {
    const predictions = await model.classify({
      imageUrl: url,
    });
    return predictions;
  } catch (e) {
    throw 500;
  }
};
