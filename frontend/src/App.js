import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// 🌍 Common Components
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
import VerifyStart from "./components/Users_componets/VerifyStart";
import SelectLanguage from "./components/Users_componets/SelectLanguage";
import MCQTest from "./components/Users_componets/MCQTest";
import ShopVerification from "./components/Users_componets/ShopVerification";
import ChangePassword from "./components/Users_componets/ChangePassword";
import BookElectrician from "./components/Users_componets/BookElectrician";
import BookForm from "./components/Users_componets/BookForm";
import BookingRequests from "./components/Users_componets/BookingRequests";

// 🧑‍💼 Admin Components
import AdminNavbar from "./components/Admin_componets/AdminNavbar";
import AdminDashboard from "./components/Admin_componets/AdminDashboard";
import ManageElectricians from "./components/Admin_componets/ManageElectricians";
import RegisterData from "./components/Admin_componets/RegisterData";
import ContactData from "./components/Admin_componets/ContactData";
import AddMCQ from "./components/Admin_componets/AddMCQ";
import MCQList from "./components/Admin_componets/MCQList";
import EditMCQ from "./components/Admin_componets/EditMCQ";
import BookingManagement from "./components/Admin_componets/BookingManagement";

// 🔐 Admin Route Guard (same level)
import AdminRoute from "./AdminRoute";

// ⏱️ Session duration (1 hour)
const TOKEN_EXPIRY_HOURS = 1;

function App() {
  const [user, setUser] = useState(null); // null | user object

  /* =====================
     SESSION CHECK
  ===================== */
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const loginTime = localStorage.getItem("loginTime");

      if (storedUser && token && loginTime) {
        const now = Date.now();
        const elapsed = now - Number(loginTime);

        if (elapsed < TOKEN_EXPIRY_HOURS * 60 * 60 * 1000) {
          setUser(JSON.parse(storedUser));
        } else {
          handleLogout();
        }
      } else {
        setUser(null);
      }
    };

    checkSession();
    window.addEventListener("focus", checkSession);

    return () => window.removeEventListener("focus", checkSession);
  }, []);

  /* =====================
     LOGIN / LOGOUT
  ===================== */
  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now());
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    setUser(null);
  };

  /* =====================
     NAVBAR
  ===================== */
  const renderNavbar = () => {
    if (!user) return <Navbar />;
    if (user.isAdmin) return <AdminNavbar onLogout={handleLogout} />;
    return <UserNavbar onLogout={handleLogout} />;
  };

  return (
    <Router>
      <div className="App">
        {renderNavbar()}

        <div className="main-content">
          <Routes>
            {/* 🌍 PUBLIC */}
            {!user && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </>
            )}

            {/* 👨‍🔧 USER */}
            {user && !user.isAdmin && (
              <>
                <Route path="/book" element={<BookElectrician />} />
                <Route path="/book/:electricianId" element={<BookForm />} />

                <Route
                  path="/electrician/booking-requests"
                  element={<BookingRequests />}
                />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/your-bookings" element={<YourBookings />} />
                <Route path="/verify" element={<VerifyStart />} />
                <Route path="/verify/language" element={<SelectLanguage />} />
                <Route path="/verify/test" element={<MCQTest />} />
                <Route path="/shop-verification" element={<ShopVerification />} />
                <Route path="/changepassword" element={< ChangePassword />} />

                <Route path="/" element={<Navigate to="/user-dashboard" />} />
                <Route path="/admin-dashboard" element={<Navigate to="/user-dashboard" />} />
              </>
            )}

            {/* 🧑‍💼 ADMIN (PROTECTED) */}
            {user && user.isAdmin && (
              <>
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/manage-electricians"
                  element={
                    <AdminRoute>
                      <ManageElectricians />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/register-data"
                  element={
                    <AdminRoute>
                      <RegisterData />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/contact-data"
                  element={
                    <AdminRoute>
                      <ContactData />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/add-mcq"
                  element={
                    <AdminRoute>
                      <AddMCQ />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/mcq-list"
                  element={
                    <AdminRoute>
                      <MCQList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/edit-mcq/:id"
                  element={
                    <AdminRoute>
                      <EditMCQ />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/bookings"
                  element={<BookingManagement />}
                />

                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/user-dashboard" element={<Navigate to="/admin-dashboard" />} />
              </>
            )}

            {/* 🚫 FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
