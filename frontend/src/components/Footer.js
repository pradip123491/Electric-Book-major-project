import React from "react";
import "../App.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer text-center text-white">
      <div className="container">
        <p className="footer-text">
          {t("footerText")}{" "}
          <strong>{t("footerProfessionals")}</strong>
          {t("footerText2")}
        </p>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {t("copyright")} —{" "}
        <span className="fw-bold">{t("appName")}</span>
      </div>
    </footer>
  );
}

export default Footer;
