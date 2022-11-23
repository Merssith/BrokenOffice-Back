const incidentService = require("../services/incidentService");

const incidents = [
  {
    status: "OPEN",
    place: "Las Toninas, Buenos Aires, Argentina",
    subject: "Incident report #862",
    geoCords: "22222,5555",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in elit sodales, aliquam mi ac, gravida nulla. Vivamus pretium fermentum aliquet. Integer aliquam maximus mi a convallis. Aliquam egestas, sapien nec feugiat placerat, libero neque vulputate elit, eget sagittis tellus erat et sem. Maecenas condimentum nisl vitae varius lacinia. Duis eros felis, mattis at sodales eget, iaculis a urna. Curabitur ultricies quam odio, quis auctor felis mollis quis. Phasellus auctor, turpis non consequat venenatis, ex libero feugiat felis, at aliquam ipsum purus et ligula. Maecenas placerat eros neque, non dictum odio gravida ut.",
    photo: "www.myphoto.com",
    userId: 2,
    itemId: 3,
  },
  {
    status: "CLOSE",
    place: "Mar del Plata, Buenos Aires, Argentina",
    subject: "Incident report #121",
    geoCords: "22222,5555",
    details:
      "Integer molestie est non diam iaculis vehicula. Ut id convallis justo. Mauris a facilisis sapien. Nam ac feugiat leo. Phasellus eget est et lacus varius tempus. Vivamus porttitor nec tellus quis maximus. Morbi dolor nulla, facilisis ac fringilla ac, venenatis pharetra tellus. Duis dolor lacus, varius eleifend dapibus a, pretium nec nisi. Suspendisse vitae lectus nec orci aliquam dictum id in ex. Morbi finibus dolor vitae ligula tempus, eget convallis diam sodales. Ut aliquet urna ac ante viverra, at condimentum sem fringilla.",
    photo: "www.myphoto.com",
    userId: 2,
    itemId: 4,
  },
  {
    status: "OPEN",
    place: "Bariloche, Río Negro, Argentina",
    subject: "Incident report #111",
    geoCords: "22222,5555",
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo: "www.myphoto.com",
    userId: 3,
    itemId: 5,
  },
  {
    status: "CLOSE",
    place: "Merlo, San Luis, Argentina",
    subject: "Incident report #642",
    geoCords: "22222,5555",
    details:
      "Aenean maximus dictum interdum. Aliquam mi purus, convallis id fermentum et, venenatis commodo massa. Vivamus egestas arcu eros, ac vulputate urna scelerisque eu. Duis ac auctor quam, ornare pellentesque dui. Aenean viverra mauris turpis, vitae accumsan tellus malesuada rhoncus. Aenean finibus vestibulum turpis. Aliquam dapibus dui id nisl dignissim, sit amet tempor est maximus. Fusce auctor velit et velit dapibus, at ultricies ipsum porta. Vivamus iaculis consectetur ante eu varius.",
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
