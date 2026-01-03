import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../img/logo.png";
import { authFetch } from "../../utils/authFetch";

function AdminNavbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDataMenu, setShowDataMenu] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();

  /* =========================
     FETCH PENDING BOOKING COUNT
  ========================== */
  useEffect(() => {
    fetchPendingCount();
  }, []);

  const fetchPendingCount = async () => {
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/bookings/pending-count`
      );
      const data = await res.json();

      if (data.success) {
        setPendingCount(data.count);
      }
    } catch (err) {
      console.error("Pending count error:", err);
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark hedr1 sticky-top shadow-lg">
      <div className="container-fluid">

        {/* Logo */}
        <Link
          to="/admin-dashboard"
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={logo}
            alt="logo"
            height="80"
            width="180"
            className="me-2"
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center text-center">

            {/* Dashboard */}
            <li className="nav-item">
              <Link className="aaa" to="/admin-dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>

            {/* Manage Electricians */}
            <li className="nav-item">
              <Link
                className="aaa"
                to="/manage-electricians"
                onClick={closeMenu}
              >
                Manage Electricians
              </Link>
            </li>

            {/* Add MCQ */}
            <li className="nav-item">
              <Link className="aaa" to="/add-mcq" onClick={closeMenu}>
                Add MCQ
              </Link>
            </li>

            {/* ===================== DATA DROPDOWN ===================== */}
            <li
              className="nav-item dropdown admin-data-dropdown"
              onMouseEnter={() => setShowDataMenu(true)}
              onMouseLeave={() => setShowDataMenu(false)}
            >
              <span className="aaa dropdown-toggle" style={{ cursor: "pointer" }}>
                Data
                {pendingCount > 0 && (
                  <span className="booking-badge">{pendingCount}</span>
                )}
              </span>

              <ul
                className={`dropdown-menu admin-menu ${
                  showDataMenu ? "show" : ""
                }`}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/register-data"
                    onClick={closeMenu}
                  >
                    Register Data
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/contact-data"
                    onClick={closeMenu}
                  >
                    Contact Data
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/mcq-list"
                    onClick={closeMenu}
                  >
                    MCQ Data
                  </Link>
                </li>

                {/* Booking Management */}
                <li>
                  <Link
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    to="/admin/bookings"
                    onClick={closeMenu}
                  >
                    Booking Management
                    {pendingCount > 0 && (
                      <span className="booking-badge small">
                        {pendingCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </li>

            {/* Logout */}
            <li className="nav-item mt-2 mt-lg-0">
              <button
                className="btn btn-danger lestbt"
                onClick={() => {
                  closeMenu();
                  handleLogoutClick();
                }}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
