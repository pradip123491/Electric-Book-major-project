import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../img/logo.png";

function UserNavbar({ onLogout }) {   // ✅ added onLogout as prop
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();  // ✅ call parent logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark hedr1 sticky-top shadow-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/user-dashboard" className="navbar-brand d-flex align-items-center">
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
              <Link className="aaa" to="/user-dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/profile" onClick={closeMenu}>
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/your-bookings" onClick={closeMenu}>
                Your Bookings
              </Link>
            </li>

            {/* Logout Button */}
            <li className="nav-item mt-2 mt-lg-0">
              <button
                className="btn btn-danger lestbt"
                onClick={() => {
                  closeMenu();
                  handleLogout();
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

export default UserNavbar;
