import React, { useEffect, useState } from "react";
import "../../App.css";
import { authFetch } from "../../utils/authFetch";

function ManageElectricians() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  /* ======================
     FILE URL
  ====================== */
  const fileUrl = (path) => {
    if (!path) return "#";
    if (path.startsWith("http")) return path;
    return `${process.env.REACT_APP_API_URL}/${path.replace(/^\/+/, "")}`;
  };

  /* ======================
     FETCH
  ====================== */
  const fetchData = async () => {
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/manage-electricians`
      );
      const data = await res.json();
      if (data.success) {
        setList(data.data);
        setFiltered(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ======================
     SEARCH
  ====================== */
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      list.filter((e) =>
        `${e.name} ${e.shop_name} ${e.shop_city} ${e.shop_mobile} ${e.gst_number || ""}`
          .toLowerCase()
          .includes(q)
      )
    );
    setPage(1);
  }, [search, list]);

  /* ======================
     ACTIONS
  ====================== */
  const openModal = (row) => {
    setCurrent(row);
    setNote("");
    setShowModal(true);
  };

  const updateStatus = async (status) => {
    if (!window.confirm(`Confirm ${status}?`)) return;

    setLoading(true);
    try {
      await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/manage-electricians/${current.verification_id}`,
        {
          method: "PUT",
          body: JSON.stringify({ status, admin_note: note }),
        }
      );
      setShowModal(false);
      fetchData();
    } catch {
      alert("Action failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteVerification = async (id) => {
    if (!window.confirm("Delete verification permanently?")) return;

    setLoading(true);
    try {
      await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/manage-electricians/${id}`,
        { method: "DELETE" }
      );
      setFiltered((p) => p.filter((x) => x.verification_id !== id));
      setList((p) => p.filter((x) => x.verification_id !== id));
    } catch {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="register-data-page admin-page-padding">
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Processing...</p>
        </div>
      )}

      {/* HEADER */}
      <div className="text-center py-4 animate-fade-in text-light">
        <h1>Manage Electricians</h1>
        <p>Verify documents & MCQ before approval</p>

        <div className="search-bar admin-search">
          <input
            placeholder="Search name, shop, city, mobile, GST..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container animate-slide-up">
        <table className="contact-table admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Shop</th>
              <th>City</th>
              <th>GST</th>
              <th>MCQ %</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((e, i) => (
              <tr key={e.verification_id}>
                <td>{(page - 1) * pageSize + i + 1}</td>
                <td>{e.name}</td>
                <td>{e.shop_mobile || "-"}</td>
                <td>{e.shop_name}</td>
                <td>{e.shop_city}</td>
                <td>{e.gst_number || "N/A"}</td>
                <td>{e.percentage ?? "-"}</td>
                <td>
                  <span
                    className={
                      e.verification_status === "approved"
                        ? "badge green"
                        : e.verification_status === "rejected"
                        ? "badge red"
                        : "badge yellow"
                    }
                  >
                    {e.verification_status}
                  </span>
                </td>
                <td>
                  <button className="view-btn" onClick={() => openModal(e)}>
                    View
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteVerification(e.verification_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {filtered.length > pageSize && (
          <div className="pagination-center">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active-page" : ""}
                onClick={() => setPage(i + 1)}
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
          <div className="modal-card modal-scroll" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>

            <h3>Electrician Verification</h3>

            <div className="modal-section">
              <p><b>Name:</b> {current.name}</p>
              <p><b>Mobile:</b> {current.shop_mobile}</p>
              <p><b>Shop:</b> {current.shop_name}</p>
              <p><b>GST:</b> {current.gst_number || "N/A"}</p>
              <p><b>City:</b> {current.shop_city}</p>
              <p><b>Address:</b> {current.shop_address}</p>
            </div>

            <hr />

            <div className="modal-section">
              <h4>Documents</h4>
              <a href={fileUrl(current.shop_photo)} target="_blank" rel="noreferrer">Shop Photo</a>
              <a href={fileUrl(current.id_proof)} target="_blank" rel="noreferrer">ID Proof</a>
              <a href={fileUrl(current.license_file)} target="_blank" rel="noreferrer">License</a>
            </div>

            <hr />

            <p>
              <b>MCQ Result:</b> {current.correct}/{current.total} ({current.percentage}%)
            </p>

            <textarea
              className="contact-input"
              placeholder="Admin note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="modal-btn-row">
              <button className="mcq-btn edit" onClick={() => updateStatus("approved")}>
                Approve
              </button>
              <button className="mcq-btn delete" onClick={() => updateStatus("rejected")}>
                Reject
              </button>
              <button className="mcq-btn close" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageElectricians;
