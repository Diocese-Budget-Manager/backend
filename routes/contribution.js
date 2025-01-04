const express = require("express");
const router = express.Router();

const contributionController = require("../controllers/contributions");
const {
  authMiddleware,
  permissionsMiddleware,
} = require("../helpers/authMiddleware");

router.get("/", authMiddleware, contributionController.getAllContributions);
router.post(
  "/",
  authMiddleware,
  // permissionsMiddleware,
  contributionController.createContribution,
);
router.put(
  "/:id",
  authMiddleware,
  // permissionsMiddleware,
  contributionController.updateContribution,
);
router.get(
  "/:id",
  authMiddleware,
  permissionsMiddleware,
  contributionController.getContributionById,
);
router.get(
  "/parish/:id",
  authMiddleware,
  // permissionsMiddleware,
  contributionController.getParishContributions,
);

router.delete(
  "/:id",
  authMiddleware,
  permissionsMiddleware,
  contributionController.deleteContribution,
);

module.exports = router;
