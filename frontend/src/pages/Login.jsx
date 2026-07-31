import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { fadeLeft, fadeRight, fadeUp, buttonHover } from "../animations";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required");

      return;
    }
    if (!isLogin && !formData.name) {
      toast.error("Name is required");

      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

      const res = await axios.post(endpoint, payload);
      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        }),
      );

      localStorage.setItem("token", res.data.token);

      if (isAdminLogin) {
        if (res.data.role !== "admin") {
          toast.error("This account is not an administrator.");
          return;
        }

        navigate("/admin");
      } else if (isLogin) {
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }

      toast.success(isLogin ? "Login Successful" : "Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-fuchsia-50 flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-violet-300/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-6xl flex items-center justify-center gap-16">
        {/* Left Side */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          className="hidden lg:block max-w-lg"
        >
          <h1 className="text-6xl font-bold text-violet-700">
            Diagnostic Care
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Book lab tests, track reports, and manage your healthcare journey
            from one platform.
          </p>

          <div className="mt-10 space-y-4 text-gray-700 text-lg">
            <p>✓ Home Sample Collection</p>
            <p>✓ Fast Report Delivery</p>
            <p>✓ Certified Laboratories</p>
            <p>✓ Online Report Download</p>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8"
        >
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <h1 className=" text-[45px] font-extrabold bg-clip-text  text-violet-700">
              {isAdminLogin
                ? "Administrator Login"
                : isLogin
                  ? "Welcome Back"
                  : "Create Account"}
            </h1>

            <p className="text-gray-600 mt-3">
              {isAdminLogin
                ? "Login with your administrator account."
                : isLogin
                  ? "Login to continue your healthcare journey"
                  : "Register to book medical tests easily"}
            </p>
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -40,
              }}
              transition={{
                duration: 0.35,
              }}
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="
w-full
p-4
rounded-2xl
border
border-gray-200
focus:outline-none
focus:ring-2
focus:ring-violet-400
transition-all
duration-300
hover:shadow-lg
focus:shadow-xl
"
                />
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="
w-full
p-4
rounded-2xl
border
border-gray-200
focus:outline-none
focus:ring-2
focus:ring-violet-400
transition-all
duration-300
hover:shadow-lg
focus:shadow-xl
"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="
w-full
p-4
rounded-2xl
border
border-gray-200
focus:outline-none
focus:ring-2
focus:ring-violet-400
transition-all
duration-300
hover:shadow-lg
focus:shadow-xl
"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" />
                    Remember Me
                  </label>

                  <button
                    type="button"
                    className="text-sm text-violet-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )} */}

              {!isLogin && (
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" />I agree to the Terms & Conditions
                </label>
              )}

              <button
                type="submit"
                disabled={loading}
                className=" w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg
              transition-all"
              >
                {loading ? "Processing..." : isLogin ? "Login" : "Register"}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          {/* <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>

            <p className="text-gray-400 text-sm">OR</p>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div> */}

          {/* Google */}
          {/* <button className="w-full border border-gray-200 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
            <FcGoogle size={24} />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button> */}

          {/* <button
            type="button"
            onClick={() => {
              setIsAdminLogin(!isAdminLogin);
              setIsLogin(true); // Always login mode
              setFormData({
                name: "",
                email: "",
                password: "",
              });
            }}
            className="w-full mt-4 border border-violet-300 text-violet-700 py-3 rounded-2xl hover:bg-violet-50 transition"
          >
            {isAdminLogin ? "Login as Patient" : "Login as Administrator"}
          </button> */}

          {/* Toggle */}
          <div className="text-center mt-8">
            <p className="text-gray-500">
              {!isAdminLogin && (
                <div className="text-center mt-8">
                  <p className="text-gray-500">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}

                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-2 text-violet-600 font-semibold hover:underline"
                    >
                      {isLogin ? "Register" : "Login"}
                    </button>
                  </p>
                </div>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
