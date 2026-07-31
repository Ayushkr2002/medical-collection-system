import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "../animations";

function About() {
  return (
    <section className="px-6 lg:px-10 py-20 bg-linear-to-br from-[#F6F4FB] via-[#F4F2FD] to-[#FBEAF5]">

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="
        max-w-7xl
        mx-auto
        bg-white/60
        backdrop-blur-lg
        rounded-[40px]
        border
        border-purple-100
        shadow-xl
        px-8
        lg:px-14
        py-16
        "
      >

        {/* Heading */}

        <motion.div
          variants={fadeUp}
          className="text-center"
        >

          <h2
            className="
            text-4xl
            lg:text-5xl
            font-bold
            bg-gradient-to-r
            from-[#4F46E5]
            via-[#7C3AED]
            to-[#C026D3]
            bg-clip-text
            text-transparent
            "
          >
            About Diagnova
          </h2>

          <p
            className="
            mt-8
            text-gray-600
            text-lg
            leading-9
            max-w-4xl
            mx-auto
            "
          >
            We're revolutionizing healthcare accessibility by
            bringing professional medical sample collection
            services directly to your doorstep.
          </p>

        </motion.div>

        {/* Cards */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="
          grid
          lg:grid-cols-2
          gap-10
          mt-16
          "
        >

          {/* Mission */}

          <motion.div
            variants={fadeUp}
            whileHover={cardHover.whileHover}
            className="
            bg-linear-to-br
            from-indigo-50
            to-purple-50
            rounded-3xl
            border
            border-purple-100
            p-10
            shadow-lg
            "
          >

            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.1,
              }}
              transition={{ duration: 0.3 }}
              className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              flex
              items-center
              justify-center
              text-white
              text-3xl
              mb-6
              shadow-lg
              "
            >
              🎯
            </motion.div>

            <h3
              className="
              text-3xl
              font-bold
              text-gray-800
              mb-5
              "
            >
              Our Mission
            </h3>

            <p
              className="
              text-gray-600
              leading-9
              text-lg
              "
            >
              To make healthcare more accessible and
              convenient by eliminating the need
              to travel for routine medical tests.
              We believe quality healthcare
              should come to you.
            </p>

          </motion.div>

          {/* Vision */}

          <motion.div
            variants={fadeUp}
            whileHover={cardHover.whileHover}
            className="
            bg-linear-to-br
            from-pink-50
            to-purple-50
            rounded-3xl
            border
            border-purple-100
            p-10
            shadow-lg
            "
          >

            <motion.div
              whileHover={{
                rotate: -10,
                scale: 1.1,
              }}
              transition={{ duration: 0.3 }}
              className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              from-fuchsia-500
              to-purple-600
              flex
              items-center
              justify-center
              text-white
              text-3xl
              mb-6
              shadow-lg
              "
            >
              🚀
            </motion.div>

            <h3
              className="
              text-3xl
              font-bold
              text-gray-800
              mb-5
              "
            >
              Our Vision
            </h3>

            <p
              className="
              text-gray-600
              leading-9
              text-lg
              "
            >
              To become the leading home healthcare
              provider trusted by thousands
              for safe, reliable and
              professional sample collection services.
            </p>

          </motion.div>

        </motion.div>

      </motion.div>

    </section>
  );
}

export default About;