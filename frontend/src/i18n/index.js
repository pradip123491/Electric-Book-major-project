// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./languages/en.json";
import gu from "./languages/gu.json";


i18n
  .use(LanguageDetector) // detects browser lang / localStorage
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
     
    },
    fallbackLng: "en",
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      // Order of detection (localStorage first so user's choice persists)
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

export default i18n;
