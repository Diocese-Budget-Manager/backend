const express = require("express");

const router = express.Router();

const budgetController = require("../controllers/budget-distribution");
const { authMiddleware, superAdminonly } = require("../helpers/authMiddleware");

router.get("/", authMiddleware, budgetController.getAllBudgets);
router.post("/", authMiddleware, superAdminonly, budgetController.createBudget);
router.put(
  "/:id",
  authMiddleware,
  superAdminonly,
  budgetController.updateBudget,
);
router.get(
  "/:id",
  authMiddleware,
  superAdminonly,
  budgetController.getBudgetById,
);
router.delete(
  "/:id",
  authMiddleware,
  superAdminonly,
  budgetController.deleteBudget,
);

module.exports = router;
