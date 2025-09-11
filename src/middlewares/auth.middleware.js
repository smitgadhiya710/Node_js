const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const userModel = require("../models/user.model");
const SECRET_KEY = process.env.JWT_TOKEN_KEY;

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token)
      return errorResponse({
        res,
        error: "token not found",
        message: "token must be require",
        status: 404,
      });

    jwt.verify(token, SECRET_KEY, async (error, tokenData) => {
      if (error)
        return errorResponse({
          res,
          error,
          message: "unauthorized",
          status: 401,
        });

      try {
        const findUser = await userModel.findOne({
          userName: tokenData.userName,
        });

        if (!findUser)
          return errorResponse({
            res,
            error,
            message: "user not found in database",
            status: 404,
          });

        req.tokenData = tokenData;
        next();
      } catch (error) {
        errorResponse({
          res,
          error,
          message: "something went wrong",
          status: 400,
        });
      }
    });
  } catch (error) {
    errorResponse({ res, error, message: "invalid token", status: 401 });
  }
};
