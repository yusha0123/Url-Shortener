const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a Username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET
    );
    return token;
  } catch (error) {
    next(error);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
