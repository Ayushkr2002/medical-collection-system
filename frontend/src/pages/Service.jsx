import {
  FaHeartbeat,
  FaTint,
  FaMicroscope,
  FaUserMd,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTint size={28} />,
    title: "Blood Test",
    desc: "Professional blood sample collection at home.",
  },
  {
    icon: <FaHeartbeat size={28} />,
    title: "Full Body Checkup",
    desc: "Complete health packages with detailed reports.",
  },
  {
    icon: <FaMicroscope size={28} />,
    title: "Lab Testing",
    desc: "Certified lab testing with accurate results.",
  },
  {
    icon: <FaUserMd size={28} />,
    title: "Doctor Consultation",
    desc: "Connect with healthcare experts anytime.",
  },
];

function Services() {
  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent">
            Our Services
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for comfort,
            convenience and trust.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="group  p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl text-white flex items-center justify-center mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Services;