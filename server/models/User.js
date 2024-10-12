const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, { timestamps: true });

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

UserSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        username: this.username,
        email: this.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d"
      }
    );
  } catch (error) {
    throw new Error("Token generation failed!");
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
