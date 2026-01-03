import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError(t("fpEmailReq"));
      return;
    }

    alert(t("fpSuccess"));
    setEmail("");
    setError("");
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
      }}
    >
      <div className="container text-center animate-fade-in">
        <h1 className="fw-bold text-uppercase mb-2">{t("fpTitle")}</h1>
        <h3 className="fw-light mb-5">{t("fpSubtitle")}</h3>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center animate-slide-up"
        >
          <input
            type="email"
            name="email"
            placeholder={t("fpEmail")}
            className="contact-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="submit pink-btn">
            {t("fpBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
