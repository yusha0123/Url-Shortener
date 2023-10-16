const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return next(new ErrorResponse("Input fields are Mandatory!", 400));
  }

  if (!validator.isEmail(email)) {
    return next(new ErrorResponse("Invalid email address!", 400));
  }

  if (!validator.isStrongPassword(password)) {
    return next(new ErrorResponse("Password is not strong enough!", 400));
  }

  const emailTaken = await User.findOne({ email });
  const usernameTaken = await User.findOne({ username });
  if (emailTaken && usernameTaken) {
    return next(new ErrorResponse("Email and Username already Exists!", 400));
  } else if (emailTaken) {
    return next(new ErrorResponse("Email already Exists!", 400));
  } else if (usernameTaken) {
    return next(new ErrorResponse("Username already Exists!", 400));
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    const token = await user.generateToken();
    res.status(201).json({
      success: true,
      token: token,
      email: email,
      message: "Registration Successful!",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Input fields are Mandatory!", 400));
  }

  if (!validator.isEmail(email)) {
    return next(new ErrorResponse("Invalid email address!", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials!", 404));
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials!", 404));
    }
    const token = await user.generateToken();
    res.status(200).json({
      success: true,
      token: token,
      email: email,
      message: "Login Successful!",
    });
  } catch (error) {
    next(error);
  }
};
