const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const { authMiddleware } = require("../helpers/authMiddleware");

router.post("/login",  authController.login);

router.post("/signup", authController.sendSignUpLink);

module.exports = router;
