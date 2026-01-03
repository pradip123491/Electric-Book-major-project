import React from "react";
import "../App.css";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-section text-white py-5 animate-fade-in">
      <div className="container mt-5">
        
        {/* Title */}
        <h1 className="display-4 fw-bold text-center text-uppercase mb-4">
          {t("aboutTitle")} <span className="text-danger">{t("appName")}</span>
        </h1>

        {/* Intro Paragraph */}
        <p
          className="lead mx-auto"
          style={{
            maxWidth: "850px",
            lineHeight: "1.8",
            fontSize: "1.3rem",
            color: "#fff",
            textAlign: "justify",
          }}
        >
          {t("aboutIntro")}
        </p>

        {/* Divider */}
        <div
          className="my-5 mx-auto"
          style={{
            height: "4px",
            width: "100px",
            background: "linear-gradient(90deg, #f40351, #ff9d00)",
            borderRadius: "10px",
          }}
        ></div>

        <div className="row align-items-center mt-5">
          
          {/* Left Section */}
          <div className="col-md-7 animate-slide-left">
            <h2 className="fw-bold text-danger mb-3">{t("ourVision")}</h2>

            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              {t("visionPara1")}
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              {t("visionPara2")}
            </p>
          </div>

          {/* Right Icon */}
          <div className="col-md-5 text-center animate-slide-right">
            <i
              className="fas fa-bolt text-danger"
              style={{
                fontSize: "13rem",
                filter: "drop-shadow(0 0 35px #f40351)",
                animation: "boltGlow 3s infinite ease-in-out",
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
