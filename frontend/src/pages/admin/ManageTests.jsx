import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ManageTests() {
  const [tests, setTests] = useState([]);
  

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    reportTime: "",
    offer: "",
    includedTests: "",
    popular: false,
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tests"
      );

      setTests(res.data);
      
      
    } catch (error) {
      toast.error("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  fetchTests();
}, []);

 const filteredTests = tests.filter((item) => {
  return item?.name?.toLowerCase().includes(search.trim().toLowerCase())
});


  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      includedTests: formData.includedTests
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/tests/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Test Updated");
      } else {
        await axios.post(
          "http://localhost:5000/api/tests",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Test Added");
      }

      setEditingId(null);

      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        reportTime: "",
        offer: "",
        includedTests: "",
        popular: false,
      });

      fetchTests();
    } catch (error) {
      toast.error("Operation Failed");
    }
  };

  const handleEdit = (test) => {
    setEditingId(test._id);

    setFormData({
      ...test,
      includedTests:
        test.includedTests.join(", "),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Test?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Deleted");

      fetchTests();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Manage Tests
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4 bg-white p-8 rounded-2xl shadow mb-10"
      >

        <input
          name="name" required
          placeholder="Test Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          name="price" required
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          name="category" required
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          name="reportTime" required
          placeholder="Report Time"
          value={formData.reportTime}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          name="offer"
          placeholder="Offer"
          value={formData.offer}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <input
          name="includedTests"
          placeholder="CBC, Sugar, Vitamin D"
          value={formData.includedTests}
          onChange={handleChange}
          className="border p-3 rounded-xl"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-xl md:col-span-2"
        />

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            name="popular"
            checked={formData.popular}
            onChange={handleChange}
          />

          Popular Test

        </label>

        <button className="bg-violet-600 text-white py-3 rounded-xl md:col-span-2">
          {editingId ? "Update Test" : "Add Test"}
        </button>

      </form>

      <input
        placeholder="Search Test..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-xl mb-8 w-full"
      />

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
                <th className="p-4">S.no</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>
  {filteredTests.length > 0 ? (
    filteredTests.map((test, index) => (
      <tr
        key={test._id}
        className="border-t"
      >
        <td className="p-4">{index + 1}</td>

        <td className="p-4">{test.name}</td>

        <td className="p-4">₹{test.price}</td>

        <td className="p-4">{test.category}</td>

        <td className="p-4 flex gap-3">
          <button
            onClick={() => handleEdit(test)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(test._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="5"
        className="text-center py-8 text-gray-500"
      >
        No Tests Found
      </td>
    </tr>
  )}
</tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageTests;