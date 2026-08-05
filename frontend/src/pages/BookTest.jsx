import { useState } from "react";
import toast from "react-hot-toast";
// import createBooking from "../services/bookingService";
import axios from "axios";

import { motion } from "framer-motion";

import {
  pageVariants,
  fadeUp,
  staggerContainer,
  
} from "../animations";

function BookTest() {
   const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    testType: "",
    address: "",
    date: "",
    time: "",
  });

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    console.log(res.data);

    toast.success("Booking submitted successfully!");

    setFormData({
      patientName: "",
      phone: "",
      testType: "",
      address: "",
      date: "",
      time: "",
    });

  } catch (error) {
    console.error("Booking error:", error);
     toast.error(
      error.response?.data?.message ||
      "Booking Failed"
    );

  } finally {

    setLoading(false);
  }
};

  return (
    <motion.section
    variants={pageVariants}
    initial="hidden"
    animate="visible"
    className="relative min-h-screen py-20 px-6 overflow-hidden bg-linear-to-br from-violet-50 via-white to-fuchsia-50"
>
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl"></div>

<div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>


      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
>

          <div className="inline-flex items-center gap-2 bg-white/70 border border-violet-200 px-5 py-2 rounded-full mb-8">
            🩺 Fast & Secure Booking
          </div>

          <h1 className="text-6xl font-extrabold leading-tight bg-clip-text text-transparent">
            Book Your Medical Test <br />
            From Home
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Schedule professional sample collection at your doorstep.
            Safe, reliable and convenient healthcare services designed
            for modern patients.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                ✅
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Certified Professionals
                </h3>

                <p className="text-gray-500">
                  Experienced healthcare staff.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                🔒
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Secure Reports
                </h3>

                <p className="text-gray-500">
                  Your medical data stays protected.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                ⚡
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Fast Collection
                </h3>

                <p className="text-gray-500">
                  Quick booking and home visits.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    whileHover={{
        y:-4
    }}
    className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10"
>

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Book Appointment
          </h2>

          <p className="text-gray-500 mb-10">
            Fill your details to schedule collection.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <motion.input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              whileFocus={{
    scale:1.02,
    boxShadow:"0px 0px 18px rgba(124,58,237,.2)"
}}
transition={{duration:.2}}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />

            {/* Phone */}
            <motion.input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              whileFocus={{
    scale:1.02,
    boxShadow:"0px 0px 18px rgba(124,58,237,.2)"
}}
transition={{duration:.2}}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />

            {/* Test Type */}
            <motion.select
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              whileFocus={{
    scale:1.02,
    boxShadow:"0px 0px 18px rgba(124,58,237,.2)"
}}
transition={{duration:.2}}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            >
              <option value="">Select Test</option>
              <option>Blood Test</option>
              <option>Thyroid Test</option>
              <option>Diabetes Test</option>
              <option>Full Body Checkup</option>
            </motion.select>

            {/* Address */}
            <motion.textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              whileFocus={{
    scale:1.02,
    boxShadow:"0px 0px 18px rgba(124,58,237,.2)"
}}
transition={{duration:.2}}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <motion.input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                whileFocus={{
    scale:1.02,
    boxShadow:"0px 0px 18px rgba(124,58,237,.2)"
}}
transition={{duration:.2}}  
                className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
                required
              />

              <motion.input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                whileFocus={{
    scale:1.02,
    boxShadow:"0px 0px 18px rgba(124,58,237,.2)"
}}
transition={{duration:.2}}
                className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
                required
              />

            </div>

            {/* Button */}
            <motion.button
  type="submit"
  disabled={loading}
  className="
w-full
bg-linear-to-r
from-violet-600
to-fuchsia-600
text-white
py-4
rounded-2xl
text-lg
font-semibold
shadow-xl
disabled:opacity-70
disabled:cursor-not-allowed
"
>
  {loading ? "Booking..." : "Confirm Booking →"}
</motion.button>


          </form>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default BookTest;