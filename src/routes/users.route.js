const express = require("express");

const {
  allUsers,
  createUser,
  findUser,
  removeUser,
  updateUser,
} = require("../controllers");

const router = express.Router();

router.route("/").get(allUsers).post(createUser);
router.route("/:id").get(findUser).patch(updateUser).delete(removeUser);

module.exports = router;
