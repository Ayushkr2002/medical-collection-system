import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "../animations";

import {
  FaCalendarCheck,
  FaUserNurse,
  FaVial,
  FaFileMedical,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCalendarCheck size={28} />,
    title: "Book Appointment",
    desc: "Choose your test and schedule sample collection easily.",
    color: "from-indigo-600 to-violet-600",
  },
  {
    icon: <FaUserNurse size={28} />,
    title: "Home Collection",
    desc: "Certified professionals visit your home safely.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: <FaVial size={28} />,
    title: "Lab Processing",
    desc: "Samples are processed in trusted certified laboratories.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <FaFileMedical size={28} />,
    title: "Get Reports",
    desc: "Download your reports securely from your dashboard.",
    color: "from-pink-500 to-fuchsia-600",
  },
];

function HowItWorks() {
  return (
    <section className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#C026D3] bg-clip-text text-transparent">
            How It Works
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            A simple and seamless healthcare process designed for your comfort.
          </p>

        </motion.div>

        {/* Cards */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >

          {steps.map((step, index) => (

            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={cardHover.whileHover}
              className="relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white/50"
            >

              {/* Step Number */}

              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`absolute -top-5 left-6 w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold shadow-lg`}
              >
                {index + 1}
              </motion.div>

              {/* Icon */}

              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center mb-6 mt-4 shadow-lg`}
              >
                {step.icon}
              </motion.div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-gray-800">
                {step.title}
              </h3>

              {/* Description */}

              <p className="text-gray-600 mt-4 leading-relaxed">
                {step.desc}
              </p>

            </motion.div>

          ))}

        </motion.div>

      </div>

    </section>
  );
}

export default HowItWorks;