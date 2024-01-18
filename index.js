const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const staticPage = require("./routes/static");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { authenticationUser } = require("./middleware/Authentication");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticationUser("token"));
app.use(express.static("./public"));

app.use("/user", userRouter);
app.use("/", staticPage);
app.use("/blog", blogRouter);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
