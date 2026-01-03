import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";
import logo from "../../img/logo.png";

function UserNavbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  /* =========================
     FETCH VERIFICATION STATUS
  ========================== */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/verification-status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVerificationStatus(data.status))
      .catch(() => setVerificationStatus("not_given"));
  }, []);

  const isVerifiedElectrician = verificationStatus === "approved";
  const showVerifyYourself =
    verificationStatus === "not_given" ||
    verificationStatus === "rejected";

  /* =========================
     FETCH ELECTRICIAN PENDING COUNT
  ========================== */
  const fetchPendingCount = () => {
    if (!isVerifiedElectrician) return;

    fetch(
      `${process.env.REACT_APP_API_URL}/api/bookings/electrician/pending-count`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPendingCount(data.count);
      })
      .catch(() => {});
  };

  /* =========================
     AUTO REFRESH + LIVE UPDATE
  ========================== */
  useEffect(() => {
    if (!isVerifiedElectrician) return;

    fetchPendingCount();

    // auto refresh every 30s
    const interval = setInterval(fetchPendingCount, 30000);

    // instant update after accept/reject
    const handler = () => fetchPendingCount();
    window.addEventListener("bookingStatusChanged", handler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("bookingStatusChanged", handler);
    };
  }, [isVerifiedElectrician]);

  /* =========================
     LANGUAGE TOGGLE
  ========================== */
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "gu" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  /* =========================
     LOGOUT
  ========================== */
  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark hedr1 sticky-top shadow-lg">
      <div className="container-fluid">

        {/* Logo */}
        <Link to="/user-dashboard" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="logo" height="80" width="180" className="me-2" />
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center text-center">

            <li className="nav-item">
              <Link className="aaa" to="/user-dashboard" onClick={closeMenu}>
                {t("udTitle") || "Dashboard"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/book" onClick={closeMenu}>
                {t("bookElectrician") || "Book Electrician"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/profile" onClick={closeMenu}>
                {t("profileTitle") || "Profile"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="aaa" to="/your-bookings" onClick={closeMenu}>
                {t("udYourBookings") || "Your Bookings"}
              </Link>
            </li>

            {/* 🔥 Booking Requests + Badge */}
            {isVerifiedElectrician && (
              <li className="nav-item">
                <Link
                  className="aaa"
                  to="/electrician/booking-requests"
                  onClick={closeMenu}
                >
                  {t("erTitle") || "Booking Requests"}
                  {pendingCount > 0 && (
                    <span className="booking-badge">{pendingCount}</span>
                  )}
                </Link>
              </li>
            )}

            {showVerifyYourself && (
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                <Link to="/verify" className="login btn btn-outline-danger" onClick={closeMenu}>
                  {t("verifyYourself") || "Verify Yourself"}
                </Link>
              </li>
            )}

            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button className="login btn btn-outline-danger" onClick={toggleLanguage}>
                🌐 {i18n.language === "en" ? "ગુજરાતી" : "English"}
              </button>
            </li>

            <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
              <button className="btn btn-danger lestbt" onClick={() => {
                closeMenu();
                handleLogout();
              }}>
                <i className="fas fa-sign-out-alt me-2"></i>
                {t("logout") || "Logout"}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
