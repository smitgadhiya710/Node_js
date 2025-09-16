const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const SECRET_KEY = process.env.JWT_TOKEN_KEY;

// persistent object in memory
let reqCountObj = {};
const time = 3 * 60 * 1000; // 3 min;
const maxReq = 3;

exports.rateLimiting = async (req, res, next) => {
  console.log("IPPPP", req.ip);

  if (reqCountObj[req.ip]) {
    reqCountObj[req.ip] = reqCountObj[req.ip].filter(
      (t) => Date.now() - t < time
    );
  } else {
    reqCountObj[req.ip] = [];
  }

  if (reqCountObj[req.ip].length >= maxReq)
    return errorResponse({
      res,
      error: "To Many Requests",
      message: "To Many Requests Try agin leter",
      status: 429,
    });

  reqCountObj[req.ip].push(Date.now());
  console.log(reqCountObj);

  next();
};
