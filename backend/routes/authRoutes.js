const express = require("express");

const router = express.Router();


const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  register,
  login,
  googleAuth,
} = require("../controllers/authController");
const passport = require("../config/passport");
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleAuth,
);

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
