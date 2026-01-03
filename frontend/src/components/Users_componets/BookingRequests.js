import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";

function BookingRequests() {
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================
     FETCH ELECTRICIAN BOOKINGS
  ===================== */
  const fetchBookings = () => {
    fetch("http://localhost:5000/api/bookings/electrician/requests", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBookings([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* =====================
     ACCEPT / REJECT / COMPLETE
  ===================== */
  const updateStatus = (bookingId, status) => {
    fetch("http://localhost:5000/api/bookings/electrician/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ bookingId, status }),
    }).then(() => {
      // 🔥 notify navbar immediately
      window.dispatchEvent(new Event("bookingStatusChanged"));
      fetchBookings();
    });
  };
  

  return (
    <div className="your-bookings-page">
      {/* Header */}
      <div
        className="text-center py-4 animate-fade-in"
        style={{ color: "#fff" }}
      >
        <h1>📥 {t("erTitle")}</h1>
        <p>{t("erSubtitle")}</p>
      </div>

      {/* Table */}
      <div className="bookings-table-container animate-slide-up">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>{t("ybBookingId")}</th>
              <th>{t("erCustomer")}</th>
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
                <td colSpan="8" className="table-center">
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="table-center">
                  {t("erNoRequests")}
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.user_name}</td>
                  <td>{b.booking_date}</td>
                  <td>{b.booking_time}</td>
                  <td className="text-wrap">{b.address}</td>
                  <td className="text-capitalize">{b.payment_mode}</td>

                  <td>
                    <span className={`status-badge ${b.status}`}>
                      {t(b.status)}
                    </span>
                  </td>

                  <td>
                    <div className="action-btn-group">
                      {b.status === "pending" && (
                        <>
                          <button
                            className="action-btn accept-btn"
                            onClick={() =>
                              updateStatus(b.id, "accepted")
                            }
                          >
                            {t("erAccept")}
                          </button>

                          <button
                            className="action-btn reject-btn"
                            onClick={() =>
                              updateStatus(b.id, "rejected")
                            }
                          >
                            {t("erReject")}
                          </button>
                        </>
                      )}

                      {b.status === "accepted" && (
                        <button
                          className="action-btn complete-btn"
                          onClick={() =>
                            updateStatus(b.id, "completed")
                          }
                        >
                          {t("erComplete")}
                        </button>
                      )}

                      {(b.status === "rejected" ||
                        b.status === "completed") && <span>—</span>}
                    </div>
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

export default BookingRequests;
