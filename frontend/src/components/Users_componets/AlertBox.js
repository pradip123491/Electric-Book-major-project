import React from "react";
import "../../App.css";

export default function AlertBox({ show, type = "success", message, onClose }) {
  if (!show) return null;

  const colors = {
    success: "#2ecc71",
    error: "#e74c3c",
    warning: "#f1c40f",
    info: "#3498db",
  };

  return (
    <div className="alert-overlay">
      <div className="alert-card">
        <div className="alert-left">
          <span className="alert-icon" style={{ background: colors[type] }}>
            {type === "success" ? "✔" : type === "error" ? "✖" : type === "warning" ? "⚠" : "ℹ"}
          </span>
        </div>

        <div className="alert-body">
          <p className="alert-message">{message}</p>
          <div className="alert-actions">
            <button className="alert-btn" onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
