exports.generateUserData = function (userData) {
  const { _id, username, email, createdAt, updatedAt } = userData;
  return { id: _id, username, email, createdAt, updatedAt };
};
