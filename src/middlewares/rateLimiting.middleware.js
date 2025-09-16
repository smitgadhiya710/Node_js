const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const SECRET_KEY = process.env.JWT_TOKEN_KEY;

// persistent object in memory
let reqCountObj = {};

exports.rateLimiting = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return errorResponse({
        res,
        error: "No token",
        message: "unauthorized",
        status: 401,
      });
    }

    jwt.verify(token, SECRET_KEY, (error, userData) => {
      if (error) {
        return errorResponse({
          res,
          error,
          message: "unauthorized",
          status: 401,
        });
      }

      if (reqCountObj[userData.id]) {
        if (reqCountObj[userData.id].length < 3) {
          reqCountObj[userData.id].push(new Date().toISOString());
        } else {
          return errorResponse({
            res,
            error: "To Many Requests",
            message: "To Many Requests Try agin leter",
            status: 429,
          });
        }
      } else {
        reqCountObj[userData.id] = [new Date().toISOString()];
      }

      console.log("reqCountObj:", reqCountObj);

      next();
    });
  } catch (error) {
    errorResponse({ res, error, message: error.message, status: 500 });
  }
};

setInterval(() => {
  reqCountObj = {};
  console.log("---->", reqCountObj);
}, 5 * 60 * 1000);
