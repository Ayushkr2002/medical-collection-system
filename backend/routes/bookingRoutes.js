
const express = require("express");
const router = express.Router();

const {
  getMyBookings,
  createBooking,
  getBookings,
  updateStatus,
  updateBookingStatus,
  uploadReport,
  cancelBooking,
} = require("../controllers/bookingController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  createBooking
);

router.get(
 "/",
 protect,
 adminOnly,
 getBookings
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);
router.delete(
  "/:id",
  protect,
  cancelBooking
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

router.put(
"/:id/status",
protect,
adminOnly,
updateBookingStatus,
uploadReport
);

module.exports = router;