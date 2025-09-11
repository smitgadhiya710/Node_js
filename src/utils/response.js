exports.successResponse = ({
  res,
  data,
  message = "Success",
  status = 200,
}) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};

exports.errorResponse = ({
  res,
  error,
  message = "Internal Server Error",
  status = 500,
}) => {
  res.status(status).json({
    success: false,
    message,
    error: typeof error === "string" ? error : error?.message || error,
  });
};
