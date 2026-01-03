import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalElectricians: 0,
    totalContacts: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/dashboard-stats`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const dashboardCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      link: "/register-data",
    },
    {
      title: "Approved Electricians",
      value: stats.totalElectricians,
      icon: "⚡",
      link: "/manage-electricians",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts,
      icon: "📩",
      link: "/contact-data",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: "📋",
      link: "/admin/bookings",
    },
  ];

  return (
    <div className="admin-dashboard-container">

      {/* Header */}
      <div className="text-center py-4" style={{ color: "#fff" }}>
        <h1>🛠 Admin Dashboard</h1>
        <p>System overview and administrative control panel</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        {dashboardCards.map((card, idx) => (
          <Link
            key={idx}
            to={card.link}
            className="dashboard-card animate-slide-up"
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p className="card-value">{card.value}</p>
            <button className="pink-btn">Go</button>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions mt-5">
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          Quick Actions
        </h2>

        <div className="action-buttons">
          <Link to="/manage-electricians" className="pink-btn">
            Manage Electricians
          </Link>
          <Link to="/register-data" className="pink-btn">
            View Users
          </Link>
          <Link to="/contact-data" className="pink-btn">
            Contact Messages
          </Link>
          <Link to="/admin/bookings" className="pink-btn">
            Manage Bookings
          </Link>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
