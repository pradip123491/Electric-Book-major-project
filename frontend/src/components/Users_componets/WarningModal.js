import React from "react";
import "../../App.css";

export default function WarningModal({ show, onClose, reason }) {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h4>Security Warning</h4>
        <p style={{ marginTop: 6 }}>{reason || "A security violation was detected."}</p>
        <p style={{ color: "#f40351", fontWeight: 700, marginTop: 8 }}>
          One more violation will auto-submit your test.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
          <button className="mcq-btn close" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
