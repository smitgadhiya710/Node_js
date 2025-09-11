const userService = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response");
const { z } = require("zod");

const userZodValidation = z.object({
  userName: z
    .string()
    .max(20, { error: "Max 20 char you can enter" })
    .toLowerCase(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
  email: z.email({ error: "invalide email address" }).toLowerCase(),
  phone: z.string().regex(/^[0-9]{10}$/, { error: "Invalide Phone number" }),
});

exports.createUser = async (req, res, next) => {
  try {
    const validate = userZodValidation.parse(req.body);
    const user = await userService.createUser(validate);
    successResponse({
      res,
      data: user,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    successResponse({ res, data: users, status: 200 });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    successResponse({ res, data: user, message: "User fetched successfully" });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const validate = userZodValidation.parse(req.body);
    const user = await userService.updateUser(req.params.id, validate);
    successResponse({ res, data: user, message: "User updated successfully" });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    successResponse({ res, data: null, message: "User deleted successfully" });
  } catch (error) {
    // next(error);
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};
