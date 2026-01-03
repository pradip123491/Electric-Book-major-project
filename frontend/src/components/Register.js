import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();

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
      newErrors.fullname = t("regFullNameReq");
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = t("regMobileReq");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
      newErrors.email = t("regEmailReq");
    if (!formData.location.trim())
      newErrors.location = t("regLocationReq");
    if (formData.password.trim().length < 8)
      newErrors.password = t("regPasswordReq");
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t("regConfirmPasswordReq");

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
          `${t("regSuccess")} ${formData.fullname} (${formData.location})`
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
        setSuccessMessage(`${t("regFailed")} ${data.message || ""}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage(t("regServerErr"));
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <>
      {loading && (
        <div className="fullscreen-loader">
          <div className="loader-circle"></div>
          <p className="loader-text">{t("regLoading")}</p>
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
          <h1 className="fw-bold text-uppercase mb-2">
            {t("regTitle")}
          </h1>

          <h3 className="fw-light mb-5">
            {t("regSubtitle")}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center animate-slide-up"
          >
            <input
              type="text"
              name="fullname"
              placeholder={t("regFullName")}
              className="contact-input"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p className="text-danger">{errors.fullname}</p>}

            <input
              type="text"
              name="mobile"
              placeholder={t("regMobile")}
              className="contact-input"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}

            <input
              type="email"
              name="email"
              placeholder={t("regEmail")}
              className="contact-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            <input
              type="text"
              name="location"
              placeholder={t("regLocation")}
              className="contact-input"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-danger">{errors.location}</p>}

            <input
              type="password"
              name="password"
              placeholder={t("regPassword")}
              className="contact-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder={t("regConfirmPassword")}
              className="contact-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}

            <button type="submit" className="submit pink-btn" disabled={loading}>
              {t("regBtn")}
            </button>

            {successMessage && (
              <p
                className={`mt-3 ${
                  successMessage.includes("success")
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
                {t("regAlready")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
