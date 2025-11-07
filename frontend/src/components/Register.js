import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname.trim())
      newErrors.fullname = "Full Name is required.";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Enter a valid email address.";
    if (!formData.location.trim())
      newErrors.location = "Please enter your location (city/area).";
    if (formData.password.trim().length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          `✅ Welcome ${formData.fullname} from ${formData.location}! Registration successful.`
        );
        setFormData({
          fullname: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
          location: "",
        });
      } else {
        setSuccessMessage(`❌ ${data.message || "Registration failed."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("⚠️ Server error. Please try again later.");
    } finally {
      setTimeout(() => setLoading(false), 800); // smooth fade-out delay
    }
  };

  return (
    <>
      {/* 🌀 Full-screen loader */}
      {loading && (
        <div className="fullscreen-loader">
          <div className="loader-circle"></div>
          <p className="loader-text">Creating your account...</p>
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
            background: "rgba(0, 0, 0, 0.4)",
            padding: "40px 20px",
            borderRadius: "15px",
            maxWidth: "600px",
            width: "90%",
          }}
        >
          <h1 className="fw-bold text-uppercase mb-2">Create Account</h1>
          <h3 className="fw-light mb-5">
            Join Electrician Book today — it’s fast and easy!
          </h3>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center animate-slide-up"
          >
            <input
              type="text"
              name="fullname"
              placeholder="Your Full Name"
              className="contact-input"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <p className="text-danger">{errors.fullname}</p>
            )}

            <input
              type="text"
              name="mobile"
              placeholder="Your Mobile Number"
              className="contact-input"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}

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
              type="text"
              name="location"
              placeholder="Your Location (City / Area)"
              className="contact-input"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p className="text-danger">{errors.location}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Your Password"
              className="contact-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat Password"
              className="contact-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}

            <button type="submit" className="submit pink-btn" disabled={loading}>
              Register
            </button>

            {successMessage && (
              <p
                className={`mt-3 ${
                  successMessage.startsWith("✅")
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {successMessage}
              </p>
            )}

            <div className="mt-3">
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  textDecoration: "underline",
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f40351")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Already have an account? <strong>Go to Login</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
