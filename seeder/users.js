const userService = require("../services/userService");

const users = [
  {
    name: "Juan Carlos",
    lastName: "Admin Supremo",
    email: "admin@1.com",
    password: "HolaHola2022!",
    telephone: 7654321,
    geoCords: { lat: -31.065328, lng: -59.776482 },
    userRoleId: 1,
    officeId: 3,
  },
  {
    name: "Juana",
    lastName: "Perez",
    email: "juana@1.com",
    password: "HolaHola2022!",
    telephone: 1234567,
    geoCords: { lat: -37.3278607, lng: -59.1338698 },
    userRoleId: 2,
    officeId: 2,
  },
  {
    name: "Nicolas",
    lastName: "Gomez",
    email: "nico@1.com",
    password: "HolaHola2022!",
    telephone: 6743345,
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    userRoleId: 3,
    officeId: 5,
  },
  {
    name: "Mabel",
    lastName: "Lechuga",
    email: "mabel@1.com",
    password: "HolaHola2022!",
    telephone: 75345,
    geoCords: { lat: -31.4005355, lng: -64.2259629 },
    userRoleId: 3,
    officeId: 4,
  },
  {
    name: "Maribel",
    lastName: "Navarro",
    email: "maribel@1.com",
    password: "HolaHola2022!",
    telephone: 1234567,
    geoCords: { lat: -31.4005355, lng: -64.2259629 },
    userRoleId: 2,
    officeId: 4,
  },
  {
    name: "Susana",
    lastName: "Gimenez",
    email: "susana@1.com",
    password: "HolaHola2022!",
    telephone: 1234567,
    geoCords: { lat: -32.9715908, lng: -68.8779286 },
    userRoleId: 2,
    officeId: 5,
  },
];

async function createUsers() {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    await userService.createUser(user);
  }
  console.log("USERS created");
}

module.exports = createUsers;
