const { errorResponse } = require("../utils/response");

let reqCountObj = {};
const time = 15 * 60 * 1000; //  minutes;
const maxReq = 100;

exports.rateLimiting = async (req, res, next) => {
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

  next();
};
