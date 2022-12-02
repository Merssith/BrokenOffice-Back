const incidentService = require("../services/incidentService");

const incidents = [
  {
    status: "OPEN",
    place: "Tandil, Buenos Aires, Argentina",
    subject: "Incident report #862",
    geoCords: { lat: -37.3278607, lng: -59.1338698 },
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in elit sodales, aliquam mi ac, gravida nulla. Vivamus pretium fermentum aliquet. Integer aliquam maximus mi a convallis. Aliquam egestas, sapien nec feugiat placerat, libero neque vulputate elit, eget sagittis tellus erat et sem. Maecenas condimentum nisl vitae varius lacinia. Duis eros felis, mattis at sodales eget, iaculis a urna. Curabitur ultricies quam odio, quis auctor felis mollis quis. Phasellus auctor, turpis non consequat venenatis, ex libero feugiat felis, at aliquam ipsum purus et ligula. Maecenas placerat eros neque, non dictum odio gravida ut.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 3,
  },
  {
    status: "CLOSED",
    place: "Tandil, Buenos Aires, Argentina",
    subject: "Incident report #121",
    geoCords: { lat: -37.3278607, lng: -59.1338698 },
    details:
      "Integer molestie est non diam iaculis vehicula. Ut id convallis justo. Mauris a facilisis sapien. Nam ac feugiat leo. Phasellus eget est et lacus varius tempus. Vivamus porttitor nec tellus quis maximus. Morbi dolor nulla, facilisis ac fringilla ac, venenatis pharetra tellus. Duis dolor lacus, varius eleifend dapibus a, pretium nec nisi. Suspendisse vitae lectus nec orci aliquam dictum id in ex. Morbi finibus dolor vitae ligula tempus, eget convallis diam sodales. Ut aliquet urna ac ante viverra, at condimentum sem fringilla.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 3,
  },
  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #111",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 4,
  },
  {
    status: "CLOSED",
    place: "Córdoba, Argentina",
    subject: "Incident report #642",
    geoCords: { lat: -31.4005355, lng: -64.2259629 },
    details:
      "Aenean maximus dictum interdum. Aliquam mi purus, convallis id fermentum et, venenatis commodo massa. Vivamus egestas arcu eros, ac vulputate urna scelerisque eu. Duis ac auctor quam, ornare pellentesque dui. Aenean viverra mauris turpis, vitae accumsan tellus malesuada rhoncus. Aenean finibus vestibulum turpis. Aliquam dapibus dui id nisl dignissim, sit amet tempor est maximus. Fusce auctor velit et velit dapibus, at ultricies ipsum porta. Vivamus iaculis consectetur ante eu varius.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 4,
  },
  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #45",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 7,
  },
  {
    status: "CLOSED",
    place: "Córdoba, Argentina",
    subject: "Incident report #32",
    geoCords: { lat: -31.4005355, lng: -64.2259629 },
    details:
      "Aenean maximus dictum interdum. Aliquam mi purus, convallis id fermentum et, venenatis commodo massa. Vivamus egestas arcu eros, ac vulputate urna scelerisque eu. Duis ac auctor quam, ornare pellentesque dui. Aenean viverra mauris turpis, vitae accumsan tellus malesuada rhoncus. Aenean finibus vestibulum turpis. Aliquam dapibus dui id nisl dignissim, sit amet tempor est maximus. Fusce auctor velit et velit dapibus, at ultricies ipsum porta. Vivamus iaculis consectetur ante eu varius.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 7,
  },
  {
    status: "CLOSED",
    place: "Córdoba, Argentina",
    subject: "Incident report #47",
    geoCords: { lat: -31.4005355, lng: -64.2259629 },
    details:
      "Aenean maximus dictum interdum. Aliquam mi purus, convallis id fermentum et, venenatis commodo massa. Vivamus egestas arcu eros, ac vulputate urna scelerisque eu. Duis ac auctor quam, ornare pellentesque dui. Aenean viverra mauris turpis, vitae accumsan tellus malesuada rhoncus. Aenean finibus vestibulum turpis. Aliquam dapibus dui id nisl dignissim, sit amet tempor est maximus. Fusce auctor velit et velit dapibus, at ultricies ipsum porta. Vivamus iaculis consectetur ante eu varius.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 7,
  },
  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #24",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 8,
  },
  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #32",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 8,
  },
  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #54",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 8,
  },
  {
    status: "CLOSED",
    place: "Mendoza, Argentina",
    subject: "Incident report #52",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 9,
  },
  {
    status: "CLOSED",
    place: "Mendoza, Argentina",
    subject: "Incident report #34",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 9,
  },
  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #65",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 10,
  },

  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #87",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 10,
  },

  {
    status: "CLOSED",
    place: "Mendoza, Argentina",
    subject: "Incident report #77",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 10,
  },

  {
    status: "OPEN",
    place: "Mendoza, Argentina",
    subject: "Incident report #40",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 11,
  },

  {
    status: "CLOSED",
    place: "Mendoza, Argentina",
    subject: "Incident report #39",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 11,
  },

  {
    status: "CLOSED",
    place: "Mendoza, Argentina",
    subject: "Incident report #14",
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    details:
      "Integer ex tellus, lacinia vel posuere quis, varius et felis. Nullam at mauris congue, sodales tellus suscipit, commodo lorem. Nam bibendum scelerisque purus vel interdum. Etiam commodo pellentesque dui convallis tincidunt. Praesent accumsan lectus eget dui interdum, non rhoncus risus egestas. Duis sollicitudin elit quam, at euismod libero fringilla et. Curabitur fermentum vitae massa eu rhoncus. Phasellus gravida ipsum ligula, eget dignissim sem rutrum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a viverra neque. Cras a velit nec lorem molestie convallis. Mauris rutrum lorem et hendrerit rutrum. Ut tincidunt vestibulum ex quis fermentum. Proin malesuada scelerisque orci a rutrum. Nulla facilisi.",
    photo:
      "https://res.cloudinary.com/dsdiadotw/image/upload/v1669725963/incidents/inc-ph-ff43459e-ecca-445a-9751-1dda9f8a5849.jpg",
    userId: 11,
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
