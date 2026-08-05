import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/mainLayout"
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Services from "./components/Service";
import BookTest from "./pages/BookTest";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin/AdminDashboard";
import Tests from "./pages/Tests";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageTests from "./pages/admin/ManageTests";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageReports from "./pages/admin/ManageReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/services" element={<Services />} />

                <Route path="/tests" element={<Tests />} />

                <Route
                  path="/book"
                  element={
                    <ProtectedRoute>
                      <BookTest />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </MainLayout>
          }
        />

        {/* Admin Layout */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly>
              <DashboardLayout>
                <Routes>
                  <Route index element={<Admin />} />

                  <Route path="tests" element={<ManageTests />} />

                  <Route path="bookings" element={<ManageBookings />} />

                  <Route path="reports" element={<ManageReports />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
