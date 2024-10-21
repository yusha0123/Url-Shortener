const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const validator = require("validator");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return next(
      new ErrorResponse("Input fields are Mandatory!", 400, "FIELDS_MISSING")
    );
  }

  if (!validator.isEmail(email)) {
    return next(
      new ErrorResponse("Invalid email address!", 400, "INVALID_EMAIL")
    );
  }

  if (!validator.isStrongPassword(password)) {
    return next(
      new ErrorResponse("Password is not strong enough!", 400, "WEAK_PASSWORD")
    );
  }

  const [emailTaken, usernameTaken] = await Promise.all([
    User.findOne({ email }),
    User.findOne({ username }),
  ]);

  if (emailTaken && usernameTaken) {
    return next(
      new ErrorResponse(
        "Email and Username already Exists!",
        400,
        "DUPLICATE_EMAIL_USERNAME"
      )
    );
  } else if (emailTaken) {
    return next(
      new ErrorResponse("Email already Exists!", 400, "DUPLICATE_EMAIL")
    );
  } else if (usernameTaken) {
    return next(
      new ErrorResponse("Username already Exists!", 400, "DUPLICATE_USERNAME")
    );
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
      message: "Registration Successful!",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Input fields are Mandatory!", 400, "FIELDS_MISSING")
    );
  }

  if (!validator.isEmail(email)) {
    return next(
      new ErrorResponse("Invalid email address!", 400, "INVALID_EMAIL")
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse("Invalid Credentials!", 404, "INVALID_CREDENTIALS")
      );
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(
        new ErrorResponse("Invalid Credentials!", 400, "INVALID_CREDENTIALS")
      );
    }

    const token = await user.generateToken();
    res.status(200).json({
      success: true,
      token: token,
      message: "Login Successful!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
