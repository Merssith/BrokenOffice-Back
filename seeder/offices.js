const officesService = require("../services/officesService");

const offices = [
  {
    name: "Unassigned Office",
    geoCords: { lat: 0, lng: 0 },
  },
  {
    name: "Tandil",
    geoCords: { lat: -37.3278607, lng: -59.1338698 },
  },
  {
    name: "Buenos Aires",
    geoCords: { lat: -34.5440473, lng: -58.472455 },
  },
  {
    name: "Córdoba",
    geoCords: { lat: -31.4005355, lng: -64.2259629 },
  },
  {
    name: "Mendoza",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
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
