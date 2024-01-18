const { getUser } = require("../services/Services");

const authenticationUser = (cookieName) => {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    const newUser = getUser(token);
    try {
      if (!newUser) return next();
      req.user = newUser;
    } catch (err) {}
    next();
  };
};

module.exports = {
  authenticationUser,
};
