const userRoleService = require("../services/userRoleService");

const roles = [
  {
    name: "Super Admin",
  },
  {
    name: "Admin",
  },
  {
    name: "User",
  },
];

async function createUserRoles() {
  for (let i = 0; i < roles.length; i++) {
    let rol = roles[i];
    await userRoleService.createUserRole(rol);
  }
  console.log("ROLES created");
}

module.exports = createUserRoles;
