const { successResponse, errorResponse } = require("../utils/response");

const cacheData = new Map();

function setCaching(key, value) {
  cacheData.set(key, value);
}

function getCaching(key) {
  return async (req, res, next) => {
    try {
      const data = await cacheData.get(`${key}-${req.url}`);

      if (data) {
        return successResponse({
          res,
          data,
          message: "cacheData",
          status: 200,
        });
      }
      next();
    } catch (error) {
      errorResponse({
        res,
        error,
        message: "cached data not found",
        status: 404,
      });
    }
  };
}

exports.caching = { setCaching, getCaching };
