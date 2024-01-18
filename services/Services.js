const jwt = require("jsonwebtoken");
const secret = "$uper@123";

const userToJwtToken = (user) => {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    profileToImageUrl: user.profileImgUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const getUser = (token) => {
  const user = jwt.verify(token, secret);
  return user;
};

module.exports = {
  userToJwtToken,
  getUser,
};
