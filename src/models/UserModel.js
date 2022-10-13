const mongoose = require("mongoose");
const userRouter = require("../routes/userRouter");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true }, // unique property to only allow 1 account per email
  profilePicture: { type: String, required: true, trim: true },
  hashedPassword: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
