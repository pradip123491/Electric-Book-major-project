// src/components/Admin_componets/RegisterData.jsx
import React, { useEffect, useState } from "react";
import "../../App.css";
import { authFetch } from "../../utils/authFetch";

const DUMMY_IMAGE =
  "https://via.placeholder.com/120x120?text=User";

function RegisterData() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     IMAGE URL FIX
  ====================== */
  const imageUrl = (path) => {
    if (!path) return DUMMY_IMAGE;
    if (path.startsWith("http")) return path;
    const clean = path.startsWith("/") ? path.slice(1) : path;
    return `${process.env.REACT_APP_API_URL}/${clean}`;
  };

  /* ======================
     FETCH USERS
  ====================== */
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setFiltered(list);
      setPage(1);
      return;
    }
    setFiltered(
      list.filter(
        (u) =>
          `${u.fullname} ${u.email} ${u.location}`
            .toLowerCase()
            .includes(q)
      )
    );
    setPage(1);
  }, [search, list]);

  const fetchUsers = async () => {
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users`
      );
      const data = await res.json();
      if (data.success) {
        setList(data.data);
        setFiltered(data.data);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  /* ======================
     ACTIONS
  ====================== */
  const openModal = (row) => {
    setCurrent(row);
    setShowModal(true);
  };

  const toggleStatus = async (id, isActive) => {
    if (!window.confirm("Change user status?")) return;

    setLoading(true);
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/status/${id}`, // ✅ FIXED
        {
          method: "PUT",
          body: JSON.stringify({ isActive: !isActive }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error();

      await fetchUsers(); // 🔥 ensure UI refresh
      setShowModal(false);
    } catch {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    setLoading(true);
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!data.success) throw new Error();

      await fetchUsers();
      setShowModal(false);
    } catch {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     PAGINATION
  ====================== */
  const visible = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="register-data-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Processing...</p>
        </div>
      )}

      {/* HEADER */}
      <div className="text-center py-4 animate-fade-in" style={{ color: "#fff" }}>
        <h1>Registered Users</h1>
        <p>View, disable or delete users</p>

        <div className="search-bar" style={{ maxWidth: 700, margin: "16px auto" }}>
          <input
            placeholder="Search name, email, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container animate-slide-up">
        <table className="contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((u, i) => (
              <tr key={u.id}>
                <td>{(page - 1) * pageSize + i + 1}</td>
                <td>{u.fullname}</td>
                <td>{u.email}</td>
                <td>{u.location}</td>
                <td>
                  <span className={u.isActive ? "text-success" : "text-danger"}>
                    {u.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
                <td>
                  <button className="view-btn" onClick={() => openModal(u)}>
                    View
                  </button>{" "}
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="no-data">No users found.</p>
        )}

        {filtered.length > pageSize && (
          <div className="pagination-center">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
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
      </div>

      {/* MODAL */}
      {showModal && current && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>

            <h3>User Details</h3>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <img
                src={imageUrl(current.profile_image)}
                alt="profile"
                width="120"
                height="120"
                style={{ borderRadius: "50%" }}
              />
            </div>

            <p><b>Name:</b> {current.fullname}</p>
            <p><b>Email:</b> {current.email}</p>
            <p><b>Location:</b> {current.location}</p>

            <hr />

            <div className="modal-btn-row">
              <button
                className="mcq-btn edit"
                onClick={() => toggleStatus(current.id, current.isActive)}
              >
                {current.isActive ? "Disable" : "Enable"}
              </button>

              <button
                className="mcq-btn delete"
                onClick={() => deleteUser(current.id)}
              >
                Delete
              </button>

              <button
                className="mcq-btn close"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterData;
