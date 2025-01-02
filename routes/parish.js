const express = require("express");
const router = express.Router();

const parishController = require("../controllers/parish-controller");
const {
  authMiddleware,
  superAdminonly,
  permissionsMiddleware,
} = require("../helpers/authMiddleware");

router.get("/", authMiddleware, parishController.getAllParishes);
router.post("/", authMiddleware, parishController.createParish);
router.put(
  "/:id",
  authMiddleware,
  // permissionsMiddleware,
  parishController.updateParish,
);
router.get(
  "/:id",
  authMiddleware,
  permissionsMiddleware,
  parishController.getParishById,
);
router.delete(
  "/:id",
  authMiddleware,
  // superAdminonly,
  parishController.deleteParish,
);

module.exports = router;
