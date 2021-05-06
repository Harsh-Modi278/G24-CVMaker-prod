const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const userObj = {
  full_name: { type: String, default: "" },
  gender: { type: String, default: "Other" },
  username: { type: String, require: true },
  googleId: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  securityQuestion: { type: String, default: "" },
  securityAnswer: { type: String, default: "" },
  dateRegistered: { type: Date, default: Date.now() },
  resumes: [{ _id: { id: false }, index: Number, id: Schema.Types.ObjectId }],
  created: { type: String, default: "" },
};

const userSchema = new Schema(userObj);
const User = mongoose.model("user", userSchema);

module.exports = User;
