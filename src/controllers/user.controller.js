const userService = require("../services/user.service");
const { successResponse } = require("../utils/response");

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    successResponse(res, user, "User created successfully");
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    successResponse(res, users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    successResponse(res, user, "User fetched successfully");
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    successResponse(res, user, "User updated successfully");
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    successResponse(res, null, "User deleted successfully");
  } catch (err) {
    next(err);
  }
};
