const {
  createUser,
  findOneUser,
  findUser,
  removeUser,
  updateUser,
} = require("../services");
const { generateUserData } = require("../utils");

exports.allUsers = async function (_req, res, next) {
  try {
    const users = await findUser();
    res.status(200).json(users.map((user) => generateUserData(user)));
  } catch (err) {
    next(err);
  }
};

exports.findUser = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await findOneUser(id);
    res.status(200).json(generateUserData(user));
  } catch (err) {
    next(err);
  }
};

exports.createUser = async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    const user = await createUser({ username, email, password });
    res.status(201).json(generateUserData(user));
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    res.status(200).json(generateUserData(user));
  } catch (err) {
    next(err);
  }
};
exports.removeUser = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = await removeUser(id);
    res.status(200).json(generateUserData(user));
  } catch (err) {
    next(err);
  }
};
