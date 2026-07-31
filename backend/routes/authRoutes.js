const express = require("express");

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { register, login } = require("../controllers/authController");

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});
router.post("/register", register);
router.post("/login", login);

module.exports = router;
