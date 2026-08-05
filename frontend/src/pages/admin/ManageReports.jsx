import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageReports() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchReports = async () => {
    try {
      const res = await axios.get(
`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = res.data;

      if (search) {
        data = data.filter((item) =>
          item.patientName.toLowerCase().includes(search.toLowerCase()),
        );
      }

      setBookings(data);
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [search]);

  const uploadReport = async (id, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("report", file);
       
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/reports/${id}/report`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(`${import.meta.env.VITE_API_URL}/reports/${id}/report`);

      toast.success("Report Uploaded");

      fetchReports();
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Manage Reports</h1>

          <p className="text-gray-500 mt-2">
            Upload and manage patient reports.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-violet-600 text-white px-5 py-3 rounded-xl font-semibold">
            {bookings.length} Bookings
          </div>

          <button
            onClick={fetchReports}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            Refresh
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-xl w-full mb-8"
      />

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">S.no</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Test</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Report</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4">{booking.patientName}</td>

                  <td className="p-4">{booking.testType}</td>

                  <td className="p-4">{booking.date}</td>

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
                    {booking.reportUrl ? (
                      <a
                        href={booking.reportUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-600 font-semibold underline"
                      >
                        View Report
                      </a>
                    ) : (
                      <span className="text-gray-400">No Report</span>
                    )}
                  </td>

                  <td className="p-4">
  <label className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg cursor-pointer">
    {booking.reportUrl ? "Replace PDF" : "Upload PDF"}

    <input
      type="file"
      accept=".pdf"
      hidden
      onChange={(e) =>
        uploadReport(booking._id, e.target.files[0])
      }
    />
  </label>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
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

export default ManageReports;
