const userService = require("../services/userService");

const users = [
  {
    name: "User",
    lastName: "User",
    email: "user@user.com",
    password: "1234",
    telephone: 1234567,
    geoCords: "[151515151],[515151212]",
    avatar: "www.miavatar.com",
  },
  {
    name: "Admin",
    lastName: "Admin",
    email: "admin@admin.com",
    password: "1234",
    telephone: 7654321,
    geoCords: "[34234324],[234234234]",
    avatar: "www.avatardeadmin.com",
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
