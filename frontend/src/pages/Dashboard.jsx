import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FaCalendarCheck,
  FaFileMedical,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
`${import.meta.env.VITE_API_URL}/bookings/my-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBookings(
          res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Booking Cancelled");

      setBookings((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-extrabold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Patient Dashboard
            </h1>

            <p className="text-gray-600 mt-3 text-lg">Welcome back 👋</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg px-6 py-4 rounded-3xl shadow-lg flex items-center gap-4">
            <FaUserCircle size={50} className="text-violet-600" />

            <div>
              <h3 className="font-bold text-gray-800">{user?.name}</h3>

              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6">
              <FaCalendarCheck size={28} />
            </div>

            <h2 className="text-4xl font-bold">{bookings.length}</h2>

            <p className="text-gray-500 mt-2">Total Bookings</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
              <FaFileMedical size={28} />
            </div>

            <h2 className="text-4xl font-bold">
              {bookings.filter((b) => b.status === "Report Ready").length}
            </h2>

            <p className="text-gray-500 mt-2">Reports Ready</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
              <FaClock size={28} />
            </div>

            <h2 className="text-4xl font-bold">
              {bookings.filter((b) => b.status !== "Report Ready").length}
            </h2>

            <p className="text-gray-500 mt-2">Pending Tests</p>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 border-b">
            <h2 className="text-3xl font-bold">Recent Bookings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-5">Patient</th>
                  <th className="p-5">Test</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Time</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Report</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    
                    console.log(booking.reportUrl),
                    <tr key={booking._id} className="border-b hover:bg-gray-50">
                      <td className="p-5">{booking.patientName}</td>

                      <td className="p-5">{booking.testType}</td>

                      <td className="p-5">{booking.date}</td>

                      <td className="p-5">{booking.time}</td>

                      <td className="p-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium
                          ${
                            booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "Sample Collected"
                                ? "bg-blue-100 text-blue-700"
                                : booking.status === "Processing"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-green-100 text-green-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="p-5">
                        {booking.reportUrl ? (
                          <a
                            href={booking.reportUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-gray-400">Not Available</span>
                        )}
                      </td>

                      <td className="p-5">
                        {booking.status === "Pending" ? (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-gray-400">Not Allowed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
