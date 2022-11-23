const userService = require("../services/userService");

const users = [
  {
    name: "Juan Carlos",
    lastName: "Admin Supremo",
    email: "admin@globant.com",
    password: "1234",
    telephone: 7654321,
    geoCords: "34234324,234234234",
    userRoleId: 1,
    officeId: 2,
  },
  {
    name: "Juana",
    lastName: "Perez",
    email: "juana@globant.com",
    password: "1234",
    telephone: 1234567,
    geoCords: "151515151,515151212",
    userRoleId: 2,
    officeId: 1,
  },
  {
    name: "Nicolas",
    lastName: "Gomez",
    email: "nico@globant.com",
    password: "1234",
    telephone: 6743345,
    geoCords: "151515151,515151212",
    userRoleId: 3,
    officeId: 4,
  },
  {
    name: "Mabel",
    lastName: "Lechuga",
    email: "mabel@globant.com",
    password: "1234",
    telephone: 75345,
    geoCords: "151515151,515151212",
    userRoleId: 3,
    officeId: 3,
  },
  {
    name: "Maribel",
    lastName: "Navarro",
    email: "maribel@globant.com",
    password: "1234",
    telephone: 1234567,
    geoCords: "1234,5678",
    userRoleId: 2,
    officeId: 3,
  },
  {
    name: "Susana",
    lastName: "Gimenez",
    email: "lasugimenez@globant.com",
    password: "1234",
    telephone: 1234567,
    geoCords: "1256,5690",
    userRoleId: 2,
    officeId: 4,
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
