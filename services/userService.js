const { User } = require("../models");
const imageService = require("./imageService");

exports.getAllUsers = async (page) => {
  let skipUsers = page;
  skipUsers >= 1 ? (skipUsers -= 1) : null;

  const usersRequest = await User.findAndCountAll({
    order: [["createdAt", "DESC"]],
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
    limit: 8,
    offset: page ? skipUsers * 8 : 0,
    distinct: true,
  });

  const { totalUsers, users, totalPages, currentPage } = getPagingData(
    usersRequest,
    page
  );

  if (!usersRequest.rows.length) throw 404;
  return { totalUsers, users, totalPages, currentPage };
};

exports.getFilteredUsers = async (role, page) => {
  let skipUsers = page;
  skipUsers >= 1 ? (skipUsers -= 1) : null;

  const usersRequest = await User.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      userRoleId: role,
    },
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
    limit: 8,
    offset: page ? skipUsers * 8 : 0,
    distinct: true
  });

  const { totalUsers, users, totalPages, currentPage } = getPagingData(
    usersRequest,
    page
  );

  if (!usersRequest.rows.length) throw 404;
  return { totalUsers, users, totalPages, currentPage };
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
  let newUser = {};
  if (!user.userRoleId) {
    newUser = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      userRoleId: 3,
      officeId: 1,
    };
    createdUser = await User.create(newUser);
  } else {
    createdUser = await User.create(user);
  }
  return createdUser;
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
    userRoleId: body.userRoleId
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
    const uploadedAvatar = await imageService.uploadAvatar(avatar);
    const updatedUser = await user.update({
      avatar: uploadedAvatar,
    });
    return updatedUser;
  } catch {
    throw 400;
  }
};

exports.getAdminsGeoCords = async () => {
  const admins = await User.findAll({ where: { userRoleId: 2 } });
  let adminArray = [];
  if (!admins) return adminArray;
  for (let i = 0; i < admins.length; i++) {
    let admin = {
      adminId: admins[i].dataValues.id,
      lat: admins[i].dataValues.geoCords.lat,
      long: admins[i].dataValues.geoCords.lng,
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


const getPagingData = (data, page) => {
  const { count: totalUsers, rows: users } = data;
  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(totalUsers / 8);
  return { totalUsers, users, totalPages, currentPage };
};