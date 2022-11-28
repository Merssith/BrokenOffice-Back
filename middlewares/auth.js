const { validateToken } = require("../config/tokens");
const userService = require("../services/userService");

async function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  req.user = await userService.getMe(user.id);
  
  next();
}

//VALIDATE THE ADMIN OR SUPER_ADMIN ROL
async function validateAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = await userService.getMe(user.id);

  if (req.user.userRoleId === 3) {
    return res.sendStatus(401);
  } else {
    next();
  }
}

//VALIDATE THE SUPER_ADMIN_ROL
async function validateSuperAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = await userService.getMe(user.id);

  if (req.user.userRoleId === 1) {
    next();
  } else {
    return res.sendStatus(401);
  }
}

module.exports = { validateAuth, validateAdmin, validateSuperAdmin };
