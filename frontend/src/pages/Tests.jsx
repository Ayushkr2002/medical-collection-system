import { motion } from "framer-motion";
import {
  pageVariants,
  fadeUp,
  staggerContainer,
  cardHover,
  buttonHover,
} from "../animations";

import { useEffect, useState } from "react";
import { getTests } from "../api/testApi";
import { Link } from "react-router-dom";

function Tests() {
  const [tests, setTests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getTests();
        console.log("Response:", res);
console.log("Data:", res.data);
        setTests(res.data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  

  const categories = [
    "All",
    ...new Set(tests.map((item) => item.category)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Tests...
      </div>
    );
  }

  const filteredTests = tests.filter((item) => {
  const matchCategory =
    category === "All" ||
    item.category.toLowerCase() === category.toLowerCase();

  const matchSearch =
    item.name.toLowerCase().includes(search.toLowerCase());

  return matchCategory && matchSearch;
});

  return (
  <motion.div
    variants={pageVariants}
    initial="hidden"
    animate="visible"
    className="min-h-screen bg-gradient-to-br from-[#F6F4FB] via-[#F4F2FD] to-[#FBEAF5]"
  >
    {/* Hero */}

    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-center py-20 px-6"
    >
      <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
        Medical Test Packages
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg leading-8">
        Choose from our wide range of diagnostic tests and book home sample
        collection in just a few clicks.
      </p>
    </motion.div>

    {/* Filters */}

    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-5 mb-12"
    >
      
      <motion.input
        whileFocus={{
          scale: 1.02,
          boxShadow: "0px 0px 20px rgba(124,58,237,.15)",
        }}
        transition={{ duration: 0.25 }}
        type="text"
        placeholder="🔍 Search Tests..."
        value={search}
        
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 p-4 rounded-2xl border border-violet-200 bg-white shadow-md outline-none"
      />

      <motion.select
        whileFocus={{ scale: 1.02 }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-4 rounded-2xl border border-violet-200 bg-white shadow-md md:w-64 outline-none"
      >
        {categories.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </motion.select>
    </motion.div>

    {/* Cards */}

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {filteredTests.length === 0 ? (
        <motion.div
          variants={fadeUp}
          className="col-span-full text-center text-xl text-gray-500"
        >
          No Tests Found
        </motion.div>
      ) : (
        filteredTests.map((test) => (
          <motion.div
            key={test._id}
            variants={fadeUp}
            whileHover={cardHover.whileHover}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-violet-100 p-7"
          >
            <div className="flex justify-between items-start">

              <h2 className="text-2xl font-bold text-gray-800">
                {test.name}
              </h2>

              {test.popular && (
                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </span>
              )}

            </div>

            <p className="mt-4 text-gray-500 leading-7">
              {test.description}
            </p>

            <div className="mt-6">

              <motion.div
                whileHover={{ scale: 1.08 }}
                className="text-4xl font-bold text-violet-700"
              >
                ₹{test.price}
              </motion.div>

              <p className="text-sm text-gray-500 mt-1">
                Report in {test.reportTime}
              </p>

            </div>

            {test.offer && (
              <div className="mt-4 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {test.offer}
              </div>
            )}

            <div className="mt-6">

              <h4 className="font-semibold mb-3">
                Included Tests
              </h4>

              <div className="space-y-2">

                {test.includedTests?.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    ✔ {item}
                  </p>
                ))}

              </div>

            </div>

            <motion.div
              whileHover={buttonHover.whileHover}
              whileTap={buttonHover.whileTap}
            >
              <Link
                to="/book-test"
                className="block mt-8 bg-gradient-to-r from-violet-600 to-pink-500 text-center text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                Book Now
              </Link>
            </motion.div>

          </motion.div>
        ))
      )}
    </motion.div>

  </motion.div>
);
}

export default Tests;