const express = require("express");

const router = express.Router();
console.log("Test Routes Loaded");
const {
  createTest,
  getTests,
  getSingleTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Public
router.get("/", getTests);
router.get("/:id", getSingleTest);

// Admin
router.post(
  "/",
  protect,
  adminOnly,
  createTest
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateTest
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTest
);

module.exports = router;