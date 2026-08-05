const express = require("express");
const router = express.Router();
console.log("Report Routes Loaded");
const upload = require("../middleware/upload");
const {
  uploadReport,
} = require("../controllers/reportController");


const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/test", (req, res) => {
  res.send("Report Route Working");
});
router.put(
  "/:id/report",
  protect,
  adminOnly,
  upload.single("report"),
  uploadReport
);
// router.put("/:id/report", (req, res) => {
//   console.log("PUT ROUTE HITt");
//   res.json({
//     message: "PUT route working",
//   });
// });

module.exports = router;