import React, { useEffect, useState } from "react";
import "../../App.css";
import { authFetch } from "../../utils/authFetch";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setFiltered(bookings);
      setPage(1);
      return;
    }

    const res = bookings.filter(
      (b) =>
        (b.user_name || "").toLowerCase().includes(q) ||
        (b.electrician_name || "").toLowerCase().includes(q) ||
        (b.status || "").toLowerCase().includes(q)
    );

    setFiltered(res);
    setPage(1);
  }, [search, bookings]);

  /* ======================
     FETCH BOOKINGS
  ====================== */
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/bookings`
      );
      const data = await res.json();

      if (data.success) {
        setBookings(data.data);
        setFiltered(data.data);
      }
    } catch (err) {
      console.error("Admin booking fetch error:", err);
      setBookings([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     UPDATE STATUS
  ====================== */
  const updateStatus = async (bookingId, status) => {
    await authFetch(
      `${process.env.REACT_APP_API_URL}/api/admin/bookings/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status }),
      }
    );
    fetchBookings();
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="register-data-page">
      <div className="text-center py-4 animate-fade-in" style={{ color: "#fff" }}>
        <h1>Booking Management</h1>
        <p>Monitor and manage all service bookings</p>

        <div className="search-bar" style={{ maxWidth: 700, margin: "16px auto" }}>
          <input
            placeholder="Search user, electrician, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container animate-slide-up">
        {loading ? (
          <p style={{ color: "#fff" }}>Loading...</p>
        ) : (
          <>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Electrician</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {visible.map((b, idx) => (
                  <tr key={b.id}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{b.user_name}</td>
                    <td>{b.electrician_name}</td>
                    <td>{b.booking_date}</td>
                    <td>{b.booking_time}</td>
                    <td>{b.payment_mode}</td>
                    <td>
                      <span className={`status-badge ${b.status}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="blue-btn"
                        onClick={() => updateStatus(b.id, "completed")}
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="no-data">No bookings found.</p>
            )}

            {filtered.length > pageSize && (
              <div className="pagination-center">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    style={{ fontWeight: page === i + 1 ? 700 : 400 }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingManagement;
