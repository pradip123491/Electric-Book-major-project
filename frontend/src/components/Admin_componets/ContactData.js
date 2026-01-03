import React, { useEffect, useState } from "react";
import "../../App.css";
import { authFetch } from "../../utils/authFetch";

function ContactData() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  /* ======================
     FETCH CONTACT DATA
  ====================== */
  const fetchContacts = async () => {
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/contacts`
      );
      const data = await res.json();

      if (data.success) {
        setList(data.data);
        setFiltered(data.data);
      }
    } catch (err) {
      console.error("Fetch contact error", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ======================
     SEARCH
  ====================== */
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFiltered(list);
      return;
    }

    setFiltered(
      list.filter((c) =>
        `${c.name} ${c.email} ${c.mobile} ${c.message}`
          .toLowerCase()
          .includes(q)
      )
    );
  }, [search, list]);

  /* ======================
     ACTIONS
  ====================== */
  const markRead = async (id) => {
    await authFetch(
      `${process.env.REACT_APP_API_URL}/api/admin/contacts/read/${id}`,
      { method: "PUT" }
    );
    fetchContacts();
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await authFetch(
      `${process.env.REACT_APP_API_URL}/api/admin/contacts/${id}`,
      { method: "DELETE" }
    );
    fetchContacts();
  };

  return (
    <div className="register-data-page">
      <div className="text-center py-4 animate-fade-in" style={{ color: "#fff" }}>
        <h1>Contact Messages</h1>
        <p>User contact form submissions</p>

        <div className="search-bar" style={{ maxWidth: 600, margin: "16px auto" }}>
          <input
            placeholder="Search name, email, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container animate-slide-up">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.mobile}</td>
                <td>{c.email}</td>
                <td style={{ maxWidth: 350 }}>{c.message}</td>
                <td>
                  <span
                    className={`status-badge ${
                      c.is_read ? "status-read" : "status-unread"
                    }`}
                  >
                    {c.is_read ? "Read" : "Unread"}
                  </span>
                </td>
                <td>
                  <div className="action-btn-group">
                    {!c.is_read && (
                      <button
                        className="mark-read-btn"
                        onClick={() => markRead(c.id)}
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(c.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="no-data">No contact messages found.</p>
        )}
      </div>
    </div>
  );
}

export default ContactData;
