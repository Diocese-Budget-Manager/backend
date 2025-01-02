const express = require("express");
const router = express.Router();
const dioceseController = require("../controllers/diocese-controller");
const { authMiddleware, superAdminonly } = require("../helpers/authMiddleware");

router.get("/", authMiddleware, dioceseController.getAllDioceses);
router.post(
  "/",
  authMiddleware,
  // superAdminonly,
  dioceseController.createDiocese,
);
router.put(
  "/:id",
  authMiddleware,
  // superAdminonly,
  dioceseController.updateDiocese,
);
router.get(
  "/:id",
  // authMiddleware,
  // superAdminonly,
  dioceseController.getDioceseById,
);

module.exports = router;
