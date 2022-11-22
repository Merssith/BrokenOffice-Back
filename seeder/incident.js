const incidentService = require("../services/incidentService");

const incidents = [
  {
    status: "OPEN",
    geoCords: "[22222],[5555]",
    details: "Incident report #862",
    photo: "www.myphoto.com",
    userId: 2,
    itemId: 3,
  },
  {
    status: "CLOSE",
    geoCords: "[22222],[5555]",
    details: "Incident report #121",
    photo: "www.myphoto.com",
    userId: 2,
    itemId: 4,
  },
  {
    status: "OPEN",
    geoCords: "[22222],[5555]",
    details: "Incident report #111",
    photo: "www.myphoto.com",
    userId: 3,
    itemId: 5,
  },
  {
    status: "CLOSE",
    geoCords: "[22222],[5555]",
    details: "Incident report #642",
    photo: "www.myphoto.com",
    userId: 4,
    itemId: 6,
  },
];

async function createIncidents() {
  for (let i = 0; i < incidents.length; i++) {
    let incident = incidents[i];
    await incidentService.createIncident(incident);
  }
  console.log("INCIDENTS created");
}

module.exports = createIncidents;
