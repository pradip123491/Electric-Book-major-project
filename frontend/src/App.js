import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

// 🏠 Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

// 👨‍🔧 User Components
import UserNavbar from "./components/Users_componets/UserNavbar";
import UserDashboard from "./components/Users_componets/UserDashboard";
import Profile from "./components/Users_componets/Profile";
import YourBookings from "./components/Users_componets/YourBookings";

// 🧑‍💼 Admin Components
import AdminNavbar from "./components/Admin_componets/AdminNavbar";
import AdminDashboard from "./components/Admin_componets/AdminDashboard";
import ManageElectricians from "./components/Admin_componets/ManageElectricians";
import RegisterData from "./components/Admin_componets/RegisterData";
import ContactData from "./components/Admin_componets/ContactData";

// ⏱️ Session duration (1 hour)
const TOKEN_EXPIRY_HOURS = 1;

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "guest"); // "guest" | "user" | "admin"

  // ✅ Re-check session on page load or tab focus
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      const loginTime = localStorage.getItem("loginTime");

      if (token && userRole && loginTime) {
        const now = new Date().getTime();
        const elapsed = now - parseInt(loginTime, 10);

        if (elapsed < TOKEN_EXPIRY_HOURS * 60 * 60 * 1000) {
          setRole(userRole);
        } else {
          console.log("⏰ Session expired — logging out...");
          handleLogout();
        }
      } else {
        setRole("guest");
      }
    };

    checkSession();

    // Re-check when user switches tab or refocuses the page
    window.addEventListener("focus", checkSession);

    return () => {
      window.removeEventListener("focus", checkSession);
    };
  }, []);

  // ✅ Handle Login (set user/admin session)
  const handleLogin = (roleType, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", roleType);
    localStorage.setItem("loginTime", new Date().getTime());
    setRole(roleType);
  };

  // ✅ Handle Logout (fixes refresh issue)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("loginTime");
    setRole("guest");
  };

  // ✅ Navbar selection (auto-updates after logout/login)
  const renderNavbar = () => {
    switch (role) {
      case "admin":
        return <AdminNavbar onLogout={handleLogout} />;
      case "user":
        return <UserNavbar onLogout={handleLogout} />;
      default:
        return <Navbar />;
    }
  };

  // ✅ Show footer only for guests
  const renderFooter = () => (role === "guest" ? <Footer /> : null);

  return (
    <Router>
      <div className="App">
        {renderNavbar()}

        <div className="main-content">
          <Routes>
            {/* 🌍 Public Routes */}
            {role === "guest" && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Redirect protected routes */}
                <Route path="/user-dashboard" element={<Navigate to="/login" />} />
                <Route path="/admin-dashboard" element={<Navigate to="/login" />} />
              </>
            )}

            {/* 👨‍🔧 User Routes */}
            {role === "user" && (
              <>
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/your-bookings" element={<YourBookings />} />
                {/* Redirect */}
                <Route path="/" element={<Navigate to="/user-dashboard" />} />
                <Route path="/admin-dashboard" element={<Navigate to="/user-dashboard" />} />
              </>
            )}

            {/* 🧑‍💼 Admin Routes */}
            {role === "admin" && (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manage-electricians" element={<ManageElectricians />} />
                <Route path="/register-data" element={<RegisterData />} />
                <Route path="/contact-data" element={<ContactData />} />
                {/* Redirect */}
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/user-dashboard" element={<Navigate to="/admin-dashboard" />} />
              </>
            )}

            {/* 🚧 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {renderFooter()}
      </div>
    </Router>
  );
}

export default App;
