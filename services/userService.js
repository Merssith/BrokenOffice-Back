const { User } = require("../models");
const { cloudimage } = require("../config/cloudinary");

exports.getAllUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        association: User.UserRole,
      },
      {
        association: User.Office,
      },
      {
        association: User.Item,
      },
      {
        association: User.Incident,
      },
    ],
  });
  if (!users.length) throw 404;
  return users;
};

exports.getUser = async (id) => {
  if (isNaN(id)) throw 400;
  const user = await User.findByPk(id, {
    include: [
      {
        association: User.UserRole,
      },
      {
        association: User.Office,
      },
      {
        association: User.Item,
      },
      {
        association: User.Incident,
      },
    ],
  });
  if (!user) throw 404;
  return user;
};

exports.createUser = async (user) => {
  if (Object.keys(user).length === 0) return 400;
  const newUser = await User.create(user);
  return newUser;
};

exports.loginUser = async (email, password) => {
  if (Object.keys(email).length === 0) return 400;
  if (Object.keys(password).length === 0) return 400;
  const user = await User.findOne({ where: { email } });
  if (!user) throw 404;
  const validate = await user.validatePassword(password);
  if (!validate) throw 401;
  return {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    telephone: user.telephone,
    geoCords: user.geoCords,
    place: user.place,
    avatar: user.avatar,
  };
};

exports.editUser = async (id, body) => {
  if (isNaN(id)) throw 400;
  const user = await User.findByPk(id);
  if (!user) throw 404;
  if (Object.keys(body).length === 0) return 400;
  let editUser = {
    name: body.name,
    lastName: body.lastName,
    telephone: body.telephone,
    geoCords: body.geoCords,
    place: body.place,
  };
  await user.update(editUser);
  return user;
};

exports.deleteUser = async (id) => {
  if (isNaN(id)) throw 400;
  const user = await User.findByPk(id);
  if (!user) throw 404;
  return User.destroy({ where: { id } });
};

exports.updateUserAvatar = async (id, avatar) => {
  if (isNaN(id)) throw 400;
  const user = await User.findByPk(id);
  if (!user) throw 404;
  try {
    const uploadedAvatar = await cloudimage.v2.uploader.upload(avatar, {
      public_id: "bo_user_avatar_" + id,
    });
    const updatedUser = await user.update({
      avatar: uploadedAvatar.secure_url,
    });
    return updatedUser;
  } catch {
    throw Error("UPLOAD FAILED");
  }
};

exports.getAdminsGeoCords = async () => {
  const admins = await User.findAll({ where: { userRoleId: 2 } });
  let adminArray = [];
  if (!admins) return adminArray;
  for (let i = 0; i < admins.length; i++) {
    let adminGeoCords = admins[i].dataValues.geoCords.split(",");
    let admin = {
      adminId: admins[i].dataValues.id,
      lat: adminGeoCords[0],
      long: adminGeoCords[1],
    };
    adminArray.push(admin);
  }
  return adminArray;
};

exports.getAssignedUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw 404;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
};

exports.getMe = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw 404;
  return {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    telephone: user.telephone,
    geoCords: user.geoCords,
    place: user.place,
    avatar: user.avatar,
    userRoleId: user.userRoleId,
  };
};
