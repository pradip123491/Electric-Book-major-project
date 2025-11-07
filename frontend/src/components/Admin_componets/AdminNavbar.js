import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../img/logo.png";

function AdminNavbar({ onLogout }) {   // ✅ added onLogout as prop
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();  // ✅ safely call parent logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark hedr1 sticky-top shadow-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/admin-dashboard" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="logo" height="80" width="180" className="me-2" />
        </Link>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center text-center">
            <li className="nav-item">
              <Link className="aaa" to="/admin-dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/manage-electricians" onClick={closeMenu}>
                Manage Electricians
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/register-data" onClick={closeMenu}>
                Register Data
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/contact-data" onClick={closeMenu}>
                Contact Data
              </Link>
            </li>

            {/* Logout Button */}
            <li className="nav-item mt-2 mt-lg-0">
              <button
                className="btn btn-danger lestbt"
                onClick={() => {
                  closeMenu();
                  handleLogoutClick();
                }}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
