const Office = require("../models/Office");

exports.getAllOffices = async () => {
  const offices = await Office.findAll({
    include: [
      {
        association: Office.Item,
      },
    ],
  });
  if (!offices.length) throw 404;
  return offices;
};

exports.getOffice = async (id) => {
  if (isNaN(id)) throw 400;
  const office = await Office.findByPk(id, {
    include: [
      {
        association: Office.Item,
      },
    ],
  });
  if (!office) throw 404;
  return office;
};

exports.editOffice = async (id, body) => {
  if (isNaN(id)) throw 400;
  const office = await Office.findByPk(id);
  if (!office) throw 404;
  if (Object.keys(body).length === 0) return 400;
  await office.update(body);
  return office;
};

exports.createOffice = async (office) => {
  if (Object.keys(office).length === 0) return 400;
  const newOffice = await Office.create(office);
  return newOffice;
};
