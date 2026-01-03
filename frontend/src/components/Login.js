import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login({ onLogin }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const newErrors = {};

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      newErrors.email = t("loginEmailReq");
    }

    if (formData.password.trim().length < 8) {
      newErrors.password = t("loginPasswordReq");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ cookie support
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrors({ form: data.message || t("loginInvalid") });
        return;
      }

      // ✅ IMPORTANT: PASS FULL USER OBJECT
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("loginTime", Date.now());

      if (onLogin) {
        onLogin(data.user, data.token);
      }

      // ✅ Redirect based on isAdmin (BOOLEAN)
      setTimeout(() => {
        if (data.user.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }, 300);

    } catch (error) {
      console.error("⚠️ Login Error:", error);
      setErrors({ form: t("loginServerErr") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">{t("loginLoading")}</p>
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
            background: "rgba(0,0,0,0.5)",
            padding: "40px 20px",
            borderRadius: "15px",
            maxWidth: "600px",
            width: "90%",
          }}
        >
          <h1 className="fw-bold text-uppercase mb-2 text-light">
            {t("loginTitle")}
          </h1>
          <h3 className="fw-light mb-5 text-light">
            {t("loginSubtitle")}
          </h3>

          {errors.form && (
            <p className="text-danger fw-bold">{errors.form}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder={t("loginEmail")}
              className="contact-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-danger">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder={t("loginPassword")}
              className="contact-input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}

            <button
              type="submit"
              className="submit pink-btn"
              disabled={loading}
            >
              {loading ? t("loginBtnLoading") : t("loginBtn")}
            </button>
          </form>

          <div className="mt-3">
            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              {t("loginNoAccount")}
            </Link>
          </div>

          <div className="mt-3">
            <Link
              to="/forgot-password"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              {t("loginForgot")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
