import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";

function VerifyStart() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="verify-container fullscreen-section text-center animate-fade-in" style={{ color: "#fff" }}>
      <h1 className="fw-bold mb-3">🔐 {t("verifyTitle")}</h1>
      <p className="lead mb-4" style={{ maxWidth: "700px", margin: "auto" }}>
        {t("verifyIntro")}
      </p>

      <div className="verify-box transparent-card" style={{ maxWidth: "800px", margin: "auto", padding: "25px" }}>
        <ul style={{ textAlign: "left", fontSize: "1.1rem", lineHeight: "1.7" }}>
          <li>📌 {t("verifyRule1")}</li>
          <li>📌 {t("verifyRule2")}</li>
          <li>📌 {t("verifyRule3")}</li>
          <li>📌 {t("verifyRule4")}</li>
          <li>📌 {t("verifyRule5")}</li>
          <li>📌 {t("verifyRule6")}</li>
          <li>📌 {t("verifyRule7")}</li>
        </ul>

        <button className="pink-btn mt-4" onClick={() => navigate("/verify/language")}>
          {t("verifyAgreeBtn")}
        </button>
      </div>
    </div>
  );
}

export default VerifyStart;
