const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const { authMiddleware } = require("../helpers/authMiddleware");
router.post("/create", authMiddleware, userController.createUser);
router.get("/all", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;