import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = t("contactNameReq");

    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = t("contactMobileReq");

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = t("contactEmailReq");

    if (!formData.message.trim())
      newErrors.message = t("contactMsgReq");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     INPUT CHANGE
  ===================== */
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
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(t("contactSuccess"));
        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to submit contact form");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="contact-page"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <div className="container text-center py-5 animate-fade-in">
        <h1 className="fw-bold text-uppercase mb-2">
          {t("contactTitle")}
        </h1>
        <h3 className="fw-light mb-5">
          {t("contactSubtitle")}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center animate-slide-up"
        >
          <input
            type="text"
            name="name"
            placeholder={t("contactName")}
            className="contact-input"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}

          <input
            type="text"
            name="mobile"
            placeholder={t("contactMobile")}
            className="contact-input"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="text-danger">{errors.mobile}</p>}

          <input
            type="email"
            name="email"
            placeholder={t("contactEmail")}
            className="contact-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}

          <textarea
            name="message"
            placeholder={t("contactMessage")}
            className="contact-input"
            rows="3"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className="text-danger">{errors.message}</p>
          )}

          <button
            type="submit"
            className="submit pink-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : t("contactBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
