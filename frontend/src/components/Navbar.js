import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../App.css";
import logo from "../img/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const { t, i18n } = useTranslation();

  // Toggle English <-> Gujarati
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "gu" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark hedr1 sticky-top shadow-lg">
      <div className="container-fluid">
        
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="logo" height="80" width="180" className="me-2" />
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center text-center">
            
            <li className="nav-item">
              <Link className="aaa" to="/" onClick={closeMenu}>
                {t("home") || "Home"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/about" onClick={closeMenu}>
                {t("about") || "About"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/contact" onClick={closeMenu}>
                {t("contact") || "Contact"}
              </Link>
            </li>

            {/* Login Button */}
            <li className="nav-item aaab">
              <Link to="/login" className="login btn btn-outline-danger">
                {t("login") || "Log In"}
              </Link>
            </li>

            {/* Create Account */}
            <li className="nav-item mt-2 mt-lg-0">
              <Link to="/register" onClick={closeMenu}>
                <button className="btn btn-danger lestbt">
                  <i className="fas fa-user fa-lg me-2"></i>
                  {t("register") || "Create Account"}
                </button>
              </Link>
            </li>

            {/* 🌐 ONE LANGUAGE TOGGLE BUTTON */}
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button className="login btn btn-outline-danger" onClick={toggleLanguage}>
                🌐 {i18n.language === "en" ? "ગુજરાતી" : "English"}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
