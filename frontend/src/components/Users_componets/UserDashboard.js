import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useTranslation } from "react-i18next";

function UserDashboard() {
  const { t } = useTranslation();

  /* =====================
     VERIFICATION STATUS
  ===================== */
  const [verification, setVerification] = useState({
    status: null,
    admin_note: null,
  });

  /* =====================
     DASHBOARD STATS
  ===================== */
  const [stats, setStats] = useState({
    yourBookings: 0,
    availableElectricians: 0,
    profileCompletion: 0,
  });

  /* =====================
     RECENT BOOKINGS
  ===================== */
  const [recentBookings, setRecentBookings] = useState([]);

  /* =====================
     FETCH VERIFICATION
  ===================== */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/verification-status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setVerification({
          status: data.status,
          admin_note: data.admin_note || null,
        });
      })
      .catch(() => {
        setVerification({ status: "not_given", admin_note: null });
      });
  }, []);

  /* =====================
     FETCH DASHBOARD STATS
  ===================== */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/dashboard-stats`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      });
  }, []);

  /* =====================
     FETCH RECENT BOOKINGS
  ===================== */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/bookings/my`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentBookings(data.slice(0, 3));
        }
      });
  }, []);

  /* =====================
     UI HELPERS
  ===================== */
  const progressColor =
    stats.profileCompletion < 40
      ? "#ef4444"
      : stats.profileCompletion < 70
      ? "#f59e0b"
      : "#22c55e";

  const statusColor = (s) => {
    if (s === "pending") return "badge-pending";
    if (s === "accepted") return "badge-accepted";
    if (s === "completed") return "badge-completed";
    if (s === "rejected") return "badge-rejected";
    return "";
  };

  return (
    <div className="user-dashboard-container">

      {/* Header */}
      <div className="text-center py-4" style={{ color: "#fff" }}>
        <h1>⚡ {t("udTitle")}</h1>
        <p>{t("udSubtitle")}</p>
      </div>

      {/* =====================
         VERIFICATION STATUS
      ===================== */}
      {verification.status === "pending" && (
        <div className="alert alert-warning text-center mx-3">
          ⏳ <b>Verification Pending</b> – Please wait for admin approval.
        </div>
      )}

      {verification.status === "approved" && (
        <div className="alert alert-success text-center mx-3">
          ✅ <b>You are a Verified Electrician</b>
        </div>
      )}

      {verification.status === "rejected" && (
        <div className="alert alert-danger text-center mx-3">
          ❌ <b>Verification Rejected</b>
          {verification.admin_note && (
            <div className="mt-2">
              <small>
                <b>Admin Note:</b> {verification.admin_note}
              </small>
            </div>
          )}
        </div>
      )}

      {verification.status === "not_given" && (
        <div className="alert alert-info text-center mx-3">
          ℹ️ <b>You are not verified yet.</b> Complete verification to get bookings.
        </div>
      )}

      {/* =====================
         STATS CARDS
      ===================== */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3>{t("udYourBookings")}</h3>
          <p className="card-value">{stats.yourBookings}</p>
          <Link to="/your-bookings" className="pink-btn">{t("udGo")}</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚡</div>
          <h3>{t("udAvailableElectricians")}</h3>
          <p className="card-value">{stats.availableElectricians}</p>
          <Link to="/book" className="pink-btn">{t("udGo")}</Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <h3>{t("udProfileCompletion")}</h3>
          <p className="card-value">{stats.profileCompletion}%</p>
          <Link to="/profile" className="pink-btn">{t("udGo")}</Link>
        </div>
      </div>

      {/* =====================
         PROFILE COMPLETION
      ===================== */}
      <div className="profile-progress-card">
        <h3>Profile Completion</h3>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${stats.profileCompletion}%`,
              background: progressColor,
            }}
          />
        </div>
        <p>{stats.profileCompletion}% completed</p>

        {stats.profileCompletion < 100 && (
          <Link to="/profile" className="pink-btn">
            Complete Missing Details
          </Link>
        )}
      </div>

      {/* =====================
         RECENT BOOKINGS
      ===================== */}
      <div className="recent-bookings-card">
        <h3>Recent Bookings</h3>

        {recentBookings.length === 0 ? (
          <p className="no-data">No bookings yet.</p>
        ) : (
          <ul>
            {recentBookings.map((b) => (
              <li key={b.id}>
                <span>#{b.id}</span>
                <span>{b.booking_date}</span>
                <span className={`status-chip ${statusColor(b.status)}`}>
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}

        <Link to="/your-bookings" className="view-all-link">
          View All Bookings →
        </Link>
      </div>

      {/* =====================
         SMART CTA
      ===================== */}
      <div className="quick-actions mt-5">
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          {t("udQuickActions")}
        </h2>

        <div className="action-buttons">
          {verification.status === "approved" ? (
            <Link to="/electrician/booking-requests" className="pink-btn">
              View Booking Requests
            </Link>
          ) : verification.status === "not_given" ? (
            <Link to="/verify" className="pink-btn">
              Verify Yourself
            </Link>
          ) : (
            <Link to="/book" className="pink-btn">
              Book Electrician
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}

export default UserDashboard;
