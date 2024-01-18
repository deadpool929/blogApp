const mongoose = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { timeStamp, error } = require("console");
const { userToJwtToken } = require("../services/Services");
mongoose.connect("mongodb://localhost:27017/blogapp");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgUrl: {
      type: String,
      default: "images/pre.png",
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timeStamp: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found!");
  console.log(password);
  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvideHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  console.log(!hashedPassword);

  if (hashedPassword !== userProvideHash) throw new Error("Wrong Password");

  const token = userToJwtToken(user);
  return token;
});

module.exports = mongoose.model("user", userSchema);
