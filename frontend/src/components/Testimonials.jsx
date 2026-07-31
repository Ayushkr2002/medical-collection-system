import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Patient",
    review:
      "The sample collection process was smooth and professional. Reports arrived on time.",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    role: "Working Professional",
    review:
      "Booking a blood test from home saved me a lot of time. Amazing experience!",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Singh",
    role: "Business Owner",
    review:
      "Very professional staff and clean dashboard experience. Highly recommended.",
    image:
      "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

function Testimonials() {
  return (
    <section className="py-28 px-6 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold  bg-clip-text text-transparent">
            What Our Patients Say
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted by thousands of patients for reliable healthcare services.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className=" p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition duration-300"
            >

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-5">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed text-lg">
                “{item.review}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-bold text-gray-800">
                    {item.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {item.role}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Testimonials;