const express = require("express");
const {
  handleSignin,
  handleLogin,
  handleLogout,
} = require("../controllers/user");
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("Signin");
});

router.get("/login", (req, res) => {
  res.render("Login");
});

router.post("/signup", handleSignin);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

module.exports = router;
