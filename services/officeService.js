const Office = require("../models/Office");


  exports.getAllOffice = async () => {
    const offices = await Office.findAll();
    return offices;
  };

  exports.getOffice = async (id) => {
    const office = await Office.findByPk(id)
    return office;
  }
  
  exports.createOffice= async (office) => {
    const newOffice = await Office.create(office);
    return newOffice;
  };

  exports.editOffice = (id, body) => {
    return Office.findByPk(id).then((office) => office.update(body));
  };