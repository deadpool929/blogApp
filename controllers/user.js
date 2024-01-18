const User = require("../models/User");

const handleSignin = async (req, res) => {
  const body = req.body;
  await User.create({
    fullName: body.fullName,
    email: body.email,
    password: body.password,
  });
  return res.redirect("/");
};

const handleLogin = async (req, res) => {
  if (!req.body) return res.redirect("/");
  try {
    const rightDetail = await User.matchPassword(
      req.body.email,
      req.body.password
    );

    return res.cookie("token", rightDetail).redirect("/");
  } catch (err) {
    return res.render("Login", { error: " wrong username or password " });
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = {
  handleSignin,
  handleLogin,
  handleLogout,
};
