const s = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const Office = require("./Office");
const UserRole = require("./UserRole");
const Incident = require("./Incident");
const Item = require("./Item");

class User extends s.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    name: {
      type: s.STRING,
      allowNull: false,
    },
    lastName: {
      type: s.STRING,
      allowNull: false,
    },
    fullName: {
      type: s.VIRTUAL,
      get: function () {
        return `${this.name} ${this.lastName}`;
      },
    },
    email: {
      type: s.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true,
    },
    password: {
      type: s.STRING,
      allowNull: false,
    },
    salt: {
      type: s.STRING,
    },
    telephone: {
      type: s.INTEGER,
    },
    geoCords: {
      type: s.JSON,
    },
    place: {
      type: s.STRING,
    },
    avatar: {
      type: s.STRING,
      defaultValue:
        "https://res.cloudinary.com/dsdiadotw/image/upload/v1668696029/avatar_default_rgp6yr.png",
    },
    refreshToken: {
      type: s.JSON,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  user.lastName =
    user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase();
  user.name = user.name[0].toUpperCase() + user.name.slice(1).toLowerCase();
  return user.lastName && user.name;
});

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();

  user.salt = salt;

  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

User.UserRole = User.belongsTo(UserRole);
User.Office = User.belongsTo(Office);
User.Item = User.hasMany(Item);
User.Incident = User.hasMany(Incident);
module.exports = User;
