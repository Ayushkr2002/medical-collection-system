import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
`${import.meta.env.VITE_API_URL}/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
      setFilteredBookings(res.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let data = [...bookings];

    if (status !== "All") {
      data = data.filter((item) => item.status === status);
    }

    if (search) {
      data = data.filter(
        (item) =>
          item.patientName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item.phone.includes(search)
      );
    }

    setFilteredBookings(data);
  }, [bookings, search, status]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
`${import.meta.env.VITE_API_URL}/bookings/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status Updated");
      fetchBookings();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Manage Bookings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all patient bookings.
          </p>
        </div>

        <div className="flex gap-3">

          <div className="bg-violet-600 text-white px-5 py-3 rounded-xl font-semibold">
            Total : {filteredBookings.length}
          </div>

          <button
            onClick={fetchBookings}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            Refresh
          </button>

        </div>

      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">

        <input
          type="text"
          placeholder="Search Patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-xl"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-3 rounded-xl"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Sample Collected</option>
          <option>Processing</option>
          <option>Report Ready</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4">S.no</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Test</th>
              <th className="p-4">Address</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.length > 0 ? (

              filteredBookings.map((booking, index) => (

                <tr
                  key={booking._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4 font-semibold">
                    {booking.patientName}
                  </td>

                  <td className="p-4">
                    {booking.phone}
                  </td>

                  <td className="p-4">
                    {booking.testType}
                  </td>

                  <td className="p-4 max-w-xs truncate">
                    {booking.address}
                  </td>

                  <td className="p-4">
                    {booking.date}
                  </td>

                  <td className="p-4">
                    {booking.time}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
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

                  <td className="p-4">

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <option>Pending</option>
                      <option>Sample Collected</option>
                      <option>Processing</option>
                      <option>Report Ready</option>
                    </select>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
                  className="text-center py-10 text-gray-500"
                >
                  No Bookings Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageBookings;