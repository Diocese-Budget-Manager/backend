const express = require('express');
const router = express.Router();

const {
    authMiddleware,
    verifyToken,
    permissionsMiddleware,
    superAdminonly,
} = require('../helpers/authMiddleware');

const ActivityLogs = require("../controllers/activity-logs.controller");

router.get("/", authMiddleware, superAdminonly, ActivityLogs.getAllActivityLogs);
router.get("/user/:userId", authMiddleware, verifyToken, permissionsMiddleware, ActivityLogs.getUserActivityLogs);
router.get("/:id", authMiddleware, permissionsMiddleware, ActivityLogs.getActivityLogById);
router.delete("/:id", authMiddleware, superAdminonly, ActivityLogs.deleteActivityLog);

module.exports = router;