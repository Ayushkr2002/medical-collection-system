import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "../animations";

function Footer() {
  return (
    <footer className="px-5 lg:px-10 py-12 bg-[#F6F4FB]">

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
        max-w-7xl
        mx-auto
        rounded-[35px]
        bg-linear-to-r
        from-indigo-700
        via-purple-600
        to-fuchsia-600
        px-8
        py-16
        shadow-2xl
        "
      >

        {/* Heading */}

        <motion.div
          variants={fadeUp}
          className="text-center"
        >

          <h2 className="
          text-4xl
          lg:text-5xl
          font-bold
          text-white
          mb-5
          ">
            Get In Touch
          </h2>

          <p className="
          text-white/80
          max-w-3xl
          mx-auto
          text-lg
          ">
            Have questions? We're here to help.
            Reach out to our team for any inquiries
            about our services.
          </p>

        </motion.div>

        {/* Cards */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="
          mt-14
          grid
          md:grid-cols-3
          gap-8
          "
        >

          {[
            {
              emoji: "📧",
              title: "Email",
              value: "support@medihome.com",
            },
            {
              emoji: "📞",
              title: "Phone",
              value: "+91 9876543210",
            },
            {
              emoji: "🕒",
              title: "Hours",
              value: "24/7 Service",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={cardHover.whileHover}
              className="
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-3xl
              p-10
              text-center
              "
            >

              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.15,
                }}
                transition={{ duration: 0.3 }}
                className="text-5xl mb-5"
              >
                {item.emoji}
              </motion.div>

              <h3
                className="
                text-white
                text-2xl
                font-bold
                mb-4
                "
              >
                {item.title}
              </h3>

              <p
                className="
                text-white/80
                text-lg
                "
              >
                {item.value}
              </p>

            </motion.div>

          ))}

        </motion.div>

      </motion.div>

    </footer>
  );
}

export default Footer;