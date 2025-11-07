import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {   // ✅ accept onLogin from props
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const roleType = data.user.isAdmin === 1 ? "admin" : "user";

        // ✅ Save session
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", roleType);
        localStorage.setItem("loginTime", new Date().getTime());

        // ✅ Update parent (App.js)
        if (onLogin) onLogin(roleType, data.token);

        // ✅ Redirect
        setTimeout(() => {
          navigate(roleType === "admin" ? "/admin-dashboard" : "/user-dashboard");
        }, 800);
      } else {
        setErrors({ form: data.message || "Invalid credentials. Please try again." });
      }
    } catch (error) {
      console.error("⚠️ Login Error:", error);
      setErrors({ form: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Logging you in...</p>
        </div>
      )}

      <div
        className="contact-page"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="container text-center animate-fade-in"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            padding: "40px 20px",
            borderRadius: "15px",
            maxWidth: "600px",
            width: "90%",
          }}
        >
          <h1 className="fw-bold text-uppercase mb-2 text-light">Log In</h1>
          <h3 className="fw-light mb-5 text-light">Access your account securely</h3>

          {errors.form && <p className="text-danger fw-bold">{errors.form}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="contact-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Your Password"
              className="contact-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}

            <button type="submit" className="submit pink-btn" disabled={loading}>
              {loading ? "Please wait..." : "Log In"}
            </button>
          </form>

          <div className="mt-3">
            <Link to="/register" style={{ color: "#fff", textDecoration: "underline" }}>
              Don’t have an account? <strong>Create Account</strong>
            </Link>
          </div>

          <div className="mt-3">
            <Link to="/forgot-password" style={{ color: "#fff", textDecoration: "underline" }}>
              Forgot Password? <strong>Reset Here</strong>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
