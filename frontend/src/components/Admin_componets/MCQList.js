import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { authFetch } from "../../utils/authFetch";

function MCQList() {
  const [mcqs, setMcqs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      setFiltered(mcqs);
      setPage(1);
      return;
    }

    const res = mcqs.filter(
      (m) =>
        (m.question_en || "").toLowerCase().includes(q) ||
        (m.question_gu || "").toLowerCase().includes(q) ||
        (m.options_en || []).some((o) =>
          (o || "").toLowerCase().includes(q)
        ) ||
        (m.options_gu || []).some((o) =>
          (o || "").toLowerCase().includes(q)
        )
    );

    setFiltered(res);
    setPage(1);
  }, [search, mcqs]);

  /* ======================
     FETCH ALL MCQs
  ====================== */
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/mcq/all`
      );
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setMcqs(data.data);
        setFiltered(data.data);
      } else {
        setMcqs([]);
        setFiltered([]);
      }
    } catch (err) {
      console.error("Fetch MCQ list error:", err);
      setMcqs([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     FETCH SINGLE MCQ
  ====================== */
  const fetchSingle = async (id) => {
    const res = await authFetch(
      `${process.env.REACT_APP_API_URL}/api/mcq/${id}`
    );
    const data = await res.json();
    if (data.success) return data.data;
    throw new Error("Failed to fetch MCQ");
  };

  const handleRead = async (id) => {
    try {
      const mcq = await fetchSingle(id);
      setCurrent(mcq);
      setShowModal(true);
    } catch {
      alert("Could not load MCQ details.");
    }
  };

  /* ======================
     DELETE MCQ
  ====================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this MCQ?")) return;

    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/mcq/delete/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success) {
        setMcqs((p) => p.filter((m) => m.id !== id));
        setFiltered((p) => p.filter((m) => m.id !== id));
        setShowModal(false);
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error");
    }
  };

  const handleEdit = (id) => navigate(`/edit-mcq/${id}`);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="register-data-page">
      <div className="text-center py-4 animate-fade-in" style={{ color: "#fff" }}>
        <h1>MCQ List</h1>
        <p>View, search, edit and delete MCQs.</p>

        <div className="search-bar" style={{ maxWidth: 700, margin: "16px auto" }}>
          <input
            placeholder="Search questions, options..."
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
                  <th>Question (EN)</th>
                  <th>Question (GU)</th>
                  <th>Correct</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((m, idx) => (
                  <tr key={m.id}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{m.question_en}</td>
                    <td>{m.question_gu}</td>
                    <td>
                      {m.correct_option !== undefined
                        ? String.fromCharCode(65 + Number(m.correct_option))
                        : "-"}
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleRead(m.id)}
                      >
                        View
                      </button>{" "}
                      <button
                        className="edit-blue-btn"
                        onClick={() => handleEdit(m.id)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(m.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="no-data">No MCQs found.</p>
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

      {showModal && current && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>

            <h3>Question Details</h3>
            <p><b>EN:</b> {current.question_en}</p>
            <p><b>GU:</b> {current.question_gu}</p>

            <hr />

            {(current.options_en || []).map((opt, i) => (
              <p key={i}>
                <b>{String.fromCharCode(65 + i)}.</b> {opt}
              </p>
            ))}

            <div className="modal-btn-row">
              <button
                className="mcq-btn edit"
                onClick={() => {
                  setShowModal(false);
                  handleEdit(current.id);
                }}
              >
                Edit
              </button>
              <button
                className="mcq-btn delete"
                onClick={() => handleDelete(current.id)}
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

export default MCQList;
