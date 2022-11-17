const userService = require("../services/userService");

const users = [
  {
    name: "Admin",
    lastName: "Supremo",
    email: "admin@admin.com",
    password: "1234",
    telephone: 7654321,
    geoCords: "[34234324],[234234234]",
    userRoleId: 1,
  },
  {
    name: "Juana",
    lastName: "Perez",
    email: "juana@user.com",
    password: "1234",
    telephone: 1234567,
    geoCords: "[151515151],[515151212]",
    userRoleId: 2,
  },
  {
    name: "Nicolas",
    lastName: "Gomez",
    email: "nico@user.com",
    password: "1234",
    telephone: 6743345,
    geoCords: "[151515151],[515151212]",
    userRoleId: 3,
  },
  {
    name: "Mabel",
    lastName: "Lechuga",
    email: "mabel@user.com",
    password: "1234",
    telephone: 75345,
    geoCords: "[151515151],[515151212]",
    userRoleId: 3,
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
