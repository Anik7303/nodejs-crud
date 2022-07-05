const mongoose = require("mongoose");
const { randomBytes, scrypt: _scrypt } = require("crypto");
const { promisify } = require("util");

const { USER } = require("../models/names");

const scrypt = promisify(_scrypt);

// fetch database model
const UserModel = mongoose.model(USER);

exports.findUser = async function () {
  return await UserModel.find();
};

exports.findOneUser = async function (id) {
  const user = await UserModel.findOne({ _id: id.toString() });
  if (!user) {
    const error = new Error("user not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

exports.createUser = async function (attrs) {
  const { username, password, email } = attrs;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    const error = new Error("email is already in use");
    error.statusCode = 422;
    throw error;
  }

  const salt = randomBytes(8).toString("hex");
  const buffer = await scrypt(password, salt, 32);
  const hash = `${buffer.toString("hex")}.${salt}`;

  const user = await UserModel.create({ username, email, password: hash });

  return user;
};

exports.updateUser = async function (id, attrs) {
  const user = await UserModel.findOne({ _id: id.toString() });
  if (!user) {
    const error = new Error("user not found");
    error.statusCode = 404;
    throw error;
  }

  for (let key of Object.keys(attrs)) {
    if (key === "password") {
      const salt = randomBytes(8).toString("hex");
      const buffer = await scrypt(attrs[key], salt, 32);
      const hash = `${buffer.toString("hex")}.${salt}`;
      user[key] = hash;
    } else {
      user[key] = attrs[key];
    }
  }

  await user.save();
  return user;
};

exports.removeUser = async function (id) {
  const user = await UserModel.findOne({ _id: id.toString() });
  if (!user) {
    const error = new Error("user not found");
    error.statusCode = 404;
    throw error;
  }

  await user.delete();
  return user;
};
