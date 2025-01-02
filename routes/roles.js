const express = require('express');
const router = express.Router();

const {
    authMiddleware,
    superAdminonly,
} = require('../helpers/authMiddleware');

const Roles = require("../controllers/roles-controller");

router.get("/", authMiddleware, superAdminonly, Roles.getAllRoles);
router.post("/", authMiddleware, Roles.createRole);
router.put("/:id", authMiddleware, superAdminonly, Roles.updateRole);
router.get("/:id", authMiddleware, superAdminonly, Roles.getRoleById);
router.delete("/:id", authMiddleware, superAdminonly, Roles.deleteRole);

module.exports = router;