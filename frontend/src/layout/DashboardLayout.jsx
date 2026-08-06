import { useState } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaFlask,
  FaCalendarAlt,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";

import { logout} from "../utils/Auth";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-[#F7F8FC]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0
          z-50 h-screen w-72
          bg-white shadow-2xl
          transform transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-violet-700">
              Diagnova
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Admin Panel
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-3">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition
              ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/tests"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition
              ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaFlask />
            Tests
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition
              ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaCalendarAlt />
            Bookings
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition
              ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaFileMedical />
            Reports
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            <FaBars />
          </button>

          <h1 className="text-2xl font-bold text-violet-700">
            Diagnova
          </h1>

          <div className="w-6"></div>

        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex justify-between items-center bg-white px-10 py-6 shadow-sm">

          <div>

            <h1 className="text-3xl font-bold text-violet-700">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage bookings, tests and reports.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold">
                Welcome
              </p>

              <p className="text-sm text-gray-500">
                Administrator
              </p>

            </div>

            <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
              A
            </div>

          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;