const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.Controller");

router.post("/register", authController.registration);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;
