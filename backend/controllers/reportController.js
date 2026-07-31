const Booking = require("../models/Booking");

const uploadReport = async (req, res) => {
  try {
    console.log("===== FILE RECEIVED =====");
    console.log(req.file);

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.reportUrl = req.file.path;
    booking.status = "Report Ready";

    await booking.save();

    console.log("===== SAVED URL =====");
    console.log(booking.reportUrl);

    res.status(200).json(booking);
  } catch (error) {
    console.log("========== ERROR ==========");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.uploadReport = uploadReport;