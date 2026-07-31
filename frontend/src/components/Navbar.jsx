import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser, logout } from "../utils/auth";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = getUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/30"
          : "bg-linear-to-br from-[#F6F4FB] via-[#F4F2FD] to-[#FBEAF5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08,
            }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full bg-amber-800 text-white font-bold flex items-center justify-center"
          >
            D
          </motion.div>

          <motion.h1
            whileHover={{ x: 4 }}
            className="text-2xl font-bold text-[#8b2267]"
          >
            Diagnova
          </motion.h1>

        </Link>

        {/* Nav Links */}

        <div className="hidden md:flex items-center gap-8 text-[#8b2267] text-[17px] font-semibold">

          <motion.div
  whileHover={{
    y: -2,
    scale: 1.08,
    color: "#6D28D9",
  }}
  transition={{
    duration: 0.25,
  }}
>
            <Link to="/">Home</Link>
          </motion.div>

          <motion.div
            whileHover={{
              y: -2,
              scale: 1.08,
              color: "#6D28D9",
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <Link to="/tests">Tests</Link>
          </motion.div>

          {user && user.role !== "admin" && (
            <motion.div
              whileHover={{
                y: -2,
                scale: 1.08,
                color: "#6D28D9",
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <Link to="/book">Book Test</Link>
            </motion.div>
          )}

        </div>

        {/* Right Side */}

        {!user ? (

          <motion.div
            whileHover={{
  scale: 1.1,
  y: -3,
  boxShadow: "0px 18px 35px rgba(124,58,237,.35)",
}}
            whileTap={{
              scale: 0.95,
            }}
          >

            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-lg"
            >
              Login
            </Link>

          </motion.div>

        ) : (

          <div className="relative flex shrink-0">

            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: 5,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setOpen(!open)}
              className="w-11 h-11 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center shadow-lg"
            >
              {user.name.charAt(0).toUpperCase()}
            </motion.button>

            <AnimatePresence>

              {open && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -15,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                >

                  <div className="px-5 py-4 border-b">

                    <h3 className="font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                  </div>

                  {user.role === "admin" ? (

                    <Link
                      to="/admin"
                      className="block px-5 py-3 hover:bg-violet-50 transition"
                    >
                      Admin Dashboard
                    </Link>

                  ) : (

                    <Link
                      to="/dashboard"
                      className="block px-5 py-3 hover:bg-violet-50 transition"
                    >
                      Dashboard
                    </Link>

                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        )}

      </div>
    </motion.nav>
  );
}

export default Navbar;