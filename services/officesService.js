const Office = require("../models/Office");

exports.getAllOffices = async () => {
  const offices = await Office.findAll({
    include: [
      {
        association: Office.Item,
      },
    ],
  });
  return offices;
};

exports.getOffice = async (id) => {
  const office = await Office.findByPk(id, {
    include: [
      {
        association: Office.Item,
      },
    ],
  });
  return office;
};

exports.editOffice = (id, body) => {
  return Office.findByPk(id).then((office) => office.update(body));
};

exports.createOffice = async (office) => {
  const newOffice = await Office.create(office);
  return newOffice;
};
