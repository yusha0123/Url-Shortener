//the purpose of this middleware is to allow only authenticated user to access API routes
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authCheck = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return next(new ErrorResponse("Unauthorized - No token provided", 401));
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded?.email }).select(
      "-password"
    );
    if (user) {
      //User exists in DB
      req.userId = user._id;
      next();
    } else {
      //User doesn't exists in DB
      return next(new ErrorResponse("User is Unauthorized!", 401));
    }
  } catch (error) {
    //Invalid Token
    return next(new ErrorResponse("User is Unauthorized!", 401));
  }
};

module.exports = authCheck;
