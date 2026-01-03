import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";

function YourBookings() {
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================
     FETCH USER BOOKINGS
  ===================== */
  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/my", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (data && Array.isArray(data.data)) {
          setBookings(data.data);
        } else {
          console.error("Unexpected response:", data);
          setBookings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setBookings([]);
        setLoading(false);
      });
  }, []);

  /* =====================
     CANCEL BOOKING (UI ONLY)
  ===================== */
  const handleDelete = (id) => {
    if (window.confirm(t("ybConfirmCancel"))) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="your-bookings-page">

      {/* Header */}
      <div
        className="text-center py-4 animate-fade-in"
        style={{ color: "#fff" }}
      >
        <h1>📋 {t("ybTitle")}</h1>
        <p>{t("ybSubtitle")}</p>
      </div>

      {/* Table */}
      <div className="bookings-table-container animate-slide-up">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>{t("ybBookingId")}</th>
              <th>{t("ybElectrician")}</th>
              <th>{t("ybDate")}</th>
              <th>{t("ybTime")}</th>
              <th>{t("ybAddress")}</th>
              <th>{t("ybPayment")}</th>
              <th>{t("ybStatus")}</th>
              <th>{t("ybAction")}</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  {t("ybNoBookings")}
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>

                  <td>{booking.electrician_name || "-"}</td>

                  <td>{booking.booking_date}</td>

                  <td>{booking.booking_time}</td>

                  <td className="text-wrap">
                    {booking.address}
                  </td>

                  <td className="text-capitalize">
                    {booking.payment_mode}
                  </td>

                  <td>
                    <span className={`status-badge ${booking.status}`}>
                      {t(booking.status)}
                    </span>
                  </td>

                  <td>
                    {booking.status === "pending" ? (
                      <button
                        className="pink-btn"
                        onClick={() => handleDelete(booking.id)}
                      >
                        {t("ybCancel")}
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YourBookings;
