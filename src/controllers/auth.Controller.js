const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils/response");
const { z, string } = require("zod");
const { getValueFromCookie } = require("../helper/getValueFromCookie");

const SECRET_KEY = process.env.JWT_TOKEN_KEY;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_TOKEN_KEY;

const userValidation = z.object({
  userName: string({ error: "username must be require" }),
  password: string({ error: "password must be require" }),
});

exports.registration = async (req, res, next) => {
  try {
    const userDetails = userValidation.parse(req.body);
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const createUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    successResponse({
      res,
      data: createUser,
      message: "user created",
      status: 201,
    });
  } catch (error) {
    errorResponse({
      res,
      error,
      message: "User registration failed",
      status: 400,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = userValidation.parse(req.body);
    const findUser = await User.findOne({ userName: user.userName });
    if (!findUser)
      return errorResponse({
        res,
        error: "Invalide username and password",
        message: "User not found",
        status: 404,
      });

    const isPasswordValid = await bcrypt.compare(
      user.password,
      findUser.password
    );

    if (!isPasswordValid)
      return errorResponse({
        res,
        error: "Invalid Password",
        message: "Invalid password",
        status: 401,
      });

    const accessToken = jwt.sign(
      { id: findUser._id, userName: findUser.userName },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: findUser._id, userName: findUser.userName },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    findUser.refreshToken = await bcrypt.hash(refreshToken, 10);
    await findUser.save();

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    successResponse({
      res,
      data: {
        accessToken,
        refreshToken,
        credential: { id: findUser._id, userName: findUser.userName },
      },
      message: "token generated",
      status: 201,
    });
  } catch (error) {
    errorResponse({
      res,
      error,
      message: "Something went wrong",
      status: 500,
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token =
      getValueFromCookie.getValueFromCookie(
        req.headers.cookie,
        "refresh-token"
      ) || req.headers.refreshtoken?.split(" ")[1];

    if (!token)
      return errorResponse({
        res,
        error: "token not found",
        message: "token must be require",
        status: 403,
      });

    jwt.verify(token, REFRESH_SECRET_KEY, async (error, tokenData) => {
      if (error)
        return errorResponse({
          res,
          error,
          message: "unauthorized",
          status: 401,
        });

      try {
        const findUser = await User.findById(tokenData.id);
        if (!findUser)
          return errorResponse({
            res,
            error,
            message: "user not found in database",
            status: 404,
          });

        const accessToken = jwt.sign(
          { id: findUser._id, userName: findUser.userName },
          SECRET_KEY,
          { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
          { id: findUser._id, userName: findUser.userName },
          REFRESH_SECRET_KEY,
          { expiresIn: "7d" }
        );

        findUser.refreshToken = await bcrypt.hash(refreshToken, 10);
        await findUser.save();

        res.cookie("refresh-token", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        successResponse({
          res,
          data: { accessToken, refreshToken },
          message: "refresh token generated",
          status: 201,
        });
      } catch (error) {
        errorResponse({
          res,
          error,
          message: "invalide token",
          status: 403,
        });
      }
    });
  } catch (error) {
    errorResponse({ res, error, message: "invalide token", status: 403 });
  }
};

exports.logout = async (req, res, next) => {
  const { token } = req.body;

  if (!token)
    return errorResponse({
      res,
      error: "token not found",
      message: "token must be require",
      status: 404,
    });

  try {
    const decode = jwt.verify(token, SECRET_KEY);

    if (!decode)
      return errorResponse({
        res,
        error,
        message: "something went wrong",
        status: 500,
      });

    const updateUser = await User.findByIdAndUpdate(decode.id, {
      refreshToken: null,
    });

    res.clearCookie("refresh-token", {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    successResponse({
      res,
      data: null,
      message: "Logout successfully",
      status: 201,
    });
  } catch (error) {
    errorResponse({ res, error, message: "something went wrong", status: 500 });
  }
};
