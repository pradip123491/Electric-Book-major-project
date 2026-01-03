import React, { useRef, useState } from "react";
import "../../App.css";
import { authFetch } from "../../utils/authFetch";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const oldRef = useRef();
  const newRef = useRef();
  const confirmRef = useRef();

  /* =====================
     PASSWORD STRENGTH
  ===================== */
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[!@#$%^&*]/.test(pwd)) score++;

    if (score === 0) return { label: "Weak", color: "red", width: "25%" };
    if (score === 1) return { label: "Medium", color: "orange", width: "50%" };
    if (score === 2) return { label: "Good", color: "#00bfff", width: "75%" };
    return { label: "Strong", color: "#00ff00", width: "100%" };
  };

  const strength = getStrength(form.newPassword);

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const newErrors = {};

    if (!form.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (form.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (newErrors.oldPassword) oldRef.current.focus();
    else if (newErrors.newPassword) newRef.current.focus();
    else if (newErrors.confirmPassword) confirmRef.current.focus();

    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     SUBMIT
  ===================== */
  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/user/change-password`,
        {
          method: "PUT",
          body: JSON.stringify({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setErrors({ form: data.message || "Failed to update password" });
        return;
      }

      setSuccess("Password updated successfully. Logging out...");

      // 🔐 AUTO LOGOUT
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
        navigate("/login");
      }, 2000);
    } catch {
      setErrors({ form: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Updating...</p>
        </div>
      )}

      <div className="profile-page">
        <div className="profile-form-container animate-slide-up">
          <form onSubmit={submit} className="profile-form">

            <input
              ref={oldRef}
              type="password"
              placeholder="Old Password"
              value={form.oldPassword}
              onChange={(e) =>
                setForm({ ...form, oldPassword: e.target.value })
              }
            />
            {errors.oldPassword && (
              <p className="text-danger">{errors.oldPassword}</p>
            )}

            <input
              ref={newRef}
              type="password"
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />

            {/* 🔥 PASSWORD STRENGTH BAR */}
            {form.newPassword && (
              <>
                <div
                  style={{
                    height: "6px",
                    background: "#444",
                    borderRadius: "5px",
                    overflow: "hidden",
                    marginTop: "5px",
                  }}
                >
                  <div
                    style={{
                      width: strength.width,
                      background: strength.color,
                      height: "100%",
                    }}
                  />
                </div>
                <small style={{ color: strength.color }}>
                  Strength: {strength.label}
                </small>
              </>
            )}

            {errors.newPassword && (
              <p className="text-danger">{errors.newPassword}</p>
            )}

            <input
              ref={confirmRef}
              type="password"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}

            {errors.form && (
              <p className="text-danger fw-bold">{errors.form}</p>
            )}

            {success && (
              <p style={{ color: "#00ff00", fontWeight: "bold" }}>
                {success}
              </p>
            )}

            <button className="pink-btn" disabled={loading}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
