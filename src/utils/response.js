exports.successResponse = (res, data, message = "Success", status) => {
  res.status(status || 200).json({
    success: true,
    message,
    data,
  });
};
