import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../img/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark hedr1 sticky-top shadow-lg">
      <div className="container-fluid">
        {/* Logo only */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
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
              <Link className="aaa" to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="aaa" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="aaa" to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>

            <li className="nav-item aaab">
              <Link to="/login" className="login btn btn-outline-danger">
                Log In
              </Link>
            </li>

            <li className="nav-item mt-2 mt-lg-0">
              <Link to="/register" onClick={closeMenu}>
                <button className="btn btn-danger lestbt">
                  <i className="fas fa-user fa-lg me-2"></i>Create Account
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
