const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();
const reportRoutes =require("./routes/reportRoutes");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://medical-collection-system-jrja.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(
  "/api/reports",
  reportRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(
"/api/tests",
testRoutes
);

app.get("/", (req, res) => {
  res.send("Medical Sample Collection API Running");
});

module.exports = app;