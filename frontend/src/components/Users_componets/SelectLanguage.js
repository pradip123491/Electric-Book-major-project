import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SelectLanguage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fsDenied, setFsDenied] = useState(false);
  const [pendingLang, setPendingLang] = useState(null);

  const tryRequestFullscreen = async () => {
    if (!document.documentElement.requestFullscreen) return false;
    try {
      await document.documentElement.requestFullscreen();
      return true;
    } catch (e) {
      return false;
    }
  };

  const startTest = async (lang) => {
    localStorage.setItem("testLang", lang);
    // set exam timer and reset saved answers
    const end = Date.now() + 30 * 60 * 1000; // 30 minutes
    localStorage.setItem("examEndTime", String(end));
    localStorage.removeItem("examAnswers");

    const ok = await tryRequestFullscreen();
    if (!ok) {
      setFsDenied(true);
      setPendingLang(lang);
      return;
    }

    navigate("/verify/test");
  };

  const retry = async () => {
    const ok = await tryRequestFullscreen();
    if (ok && pendingLang) {
      setFsDenied(false);
      navigate("/verify/test");
    } else {
      alert("Please allow fullscreen to enable strict exam mode, or continue without fullscreen.");
    }
  };

  return (
    <div className="verify-container text-center text-white animate-fade-in">
      <h2 className="mb-4">{t("selectLanguage") || "Select Language"}</h2>

      <button className="pink-btn mx-3" onClick={() => startTest("en")}>🇮🇳 {t("english") || "English"}</button>
      <button className="pink-btn mx-3" onClick={() => startTest("gu")}>🇮🇳 {t("gujarati") || "Gujarati"}</button>

      {fsDenied && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: "#ffdd57" }}>
            Fullscreen permission not granted — strict exam security requires fullscreen.
          </p>
          <button className="pink-btn" style={{ width: 220 }} onClick={retry}>Allow Fullscreen & Continue</button>

          <p style={{ fontSize: 13, marginTop: 8 }}>
            Or continue without fullscreen (strict security reduced).
          </p>

          <button
            className="pink-btn"
            style={{ width: 200, marginTop: 8, background: "#666" }}
            onClick={() => {
              setFsDenied(false);
              navigate("/verify/test");
            }}
          >
            Continue Without Fullscreen
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectLanguage;
