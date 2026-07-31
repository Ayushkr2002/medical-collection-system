import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";



import {
  FaUsers,
  FaVial,
  FaClock,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

   
useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5000/api/bookings",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setBookings(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

 
  fetchBookings();
}, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

await axios.put(
  `http://localhost:5000/api/bookings/${id}/status`,
  { status },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      toast.success("Status Updated");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status }
            : booking
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.patientName
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      
        <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
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
              <h1 className="text-5xl font-extrabold bg-clip-text text-transparent">
                Admin Dashboard
              </h1>

              <p className="text-gray-600 mt-3 text-lg">
                Manage bookings, reports and patient operations.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
              />

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">

            {/* Total Patients */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">

              <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
                <FaUsers size={28} />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {bookings.length}
              </h2>

              <p className="text-gray-500 mt-2">
                Total Patients
              </p>

            </div>

            {/* Total Tests */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <FaVial size={28} />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {bookings.length}
              </h2>

              <p className="text-gray-500 mt-2">
                Tests Completed
              </p>

            </div>

            {/* Pending */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">

              <div className="w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center mb-6">
                <FaClock size={28} />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {
                  bookings.filter(
                    (b) =>
                      b.status === "Pending"
                  ).length
                }
              </h2>

              <p className="text-gray-500 mt-2">
                Pending Collections
              </p>

            </div>

            {/* Completed */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">

              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <FaCheckCircle size={28} />
              </div>

              <h2 className="text-4xl font-bold text-gray-800">
                {
                  bookings.filter(
                    (b) =>
                      b.status === "Report Ready"
                  ).length
                }
              </h2>

              <p className="text-gray-500 mt-2">
                Reports Delivered
              </p>

            </div>

          </div>

          {/* Booking Table */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">

            <div className="flex justify-between items-center p-8 border-b border-gray-200">

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Recent Bookings
                </h2>

                <p className="text-gray-500 mt-2">
                  Monitor and manage patient appointments.
                </p>
              </div>

              <button className="text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition">
                Export Data
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="p-5 text-gray-600">
                      Patient
                    </th>

                    <th className="p-5 text-gray-600">
                      Test
                    </th>

                    <th className="p-5 text-gray-600">
                      Date
                    </th>

                    <th className="p-5 text-gray-600">
                      Status
                    </th>

                    <th className="p-5 text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredBookings.length > 0 ? (

                    filteredBookings.map(
                      (booking) => (
                        <tr
                          key={booking._id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >

                          <td className="p-5 font-semibold text-gray-800">
                            {booking.patientName}
                          </td>

                          <td className="p-5 text-gray-600">
                            {booking.testType}
                          </td>

                          <td className="p-5 text-gray-600">
                            {booking.date}
                          </td>

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

                            <select
                              value={booking.status}
                              onChange={(e) =>
                                updateStatus(
                                  booking._id,
                                  e.target.value
                                )
                              }
                              className="border border-gray-200 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                            >
                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Sample Collected">
                                Sample Collected
                              </option>

                              <option value="Processing">
                                Processing
                              </option>

                              <option value="Report Ready">
                                Report Ready
                              </option>

                            </select>

                          </td>

                        </tr>
                      )
                    )

                  ) : (

                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-gray-500"
                      >
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

export default AdminDashboard;