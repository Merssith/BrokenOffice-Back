const officesService = require("../services/officesService");

const offices = [
  {
    name: "Tandil",
    geoCords: "[-37.3278607],[-59.1338698]",
  },
  {
    name: "Buenos Aires",
    geoCords: "[-34.5440473],[-58.472455]",
  },
  {
    name: "Córdoba",
    geoCords: "[-31.4005355],[-64.2259629]",
  },
  {
    name: "Mendoza",
    geoCords: "[-32.9715908],[-68.8779286]",
  },
];

async function createOffices() {
  for (let i = 0; i < offices.length; i++) {
    let office = offices[i];
    await officesService.createOffice(office);
  }
  console.log("OFFICES created");
}

module.exports = createOffices;
