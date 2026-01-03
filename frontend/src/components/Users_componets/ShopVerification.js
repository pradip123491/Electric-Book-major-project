// src/components/ShopVerification.jsx
import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import bg1 from "../../img/bg1.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ShopVerification() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: "",
    shopAddress: "",
    shopCity: "",
    shopMobile: "",
    gstNumber: "",
  });

  const [files, setFiles] = useState({
    shopPhoto: null,
    idProof: null,
    license: null,
  });

  const [previews, setPreviews] = useState({
    shopPhoto: null,
    idProof: null,
    license: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const refs = {
    shopName: useRef(null),
    shopAddress: useRef(null),
    shopCity: useRef(null),
    shopMobile: useRef(null),
    gstNumber: useRef(null),
    shopPhoto: useRef(null),
    idProof: useRef(null),
    license: useRef(null),
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((u) => u && URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.shopName.trim()) newErrors.shopName = "Shop name is required.";
    if (!formData.shopAddress.trim()) newErrors.shopAddress = "Shop address is required.";
    if (!/^\d{10}$/.test(formData.shopMobile)) newErrors.shopMobile = "Valid 10-digit mobile is required.";
    if (formData.gstNumber && !/^[0-9A-Z]{15}$/.test(formData.gstNumber.toUpperCase()))
      newErrors.gstNumber = "Invalid GST number (15 chars expected).";

    if (!files.shopPhoto) newErrors.shopPhoto = "Shop photo is required.";
    if (!files.idProof) newErrors.idProof = "ID proof is required.";
    if (!files.license) newErrors.license = "Shop license / trade license is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const ref = refs[firstKey];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        try { ref.current.focus(); } catch {}
      }
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
    setSuccessMessage("");
  };

  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0] ?? null;

    if (previews[name]) URL.revokeObjectURL(previews[name]);

    setFiles((p) => ({ ...p, [name]: file }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setSuccessMessage("");

    if (file && file.type && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviews((p) => ({ ...p, [name]: url }));
    } else {
      setPreviews((p) => ({ ...p, [name]: null }));
    }
  };

  const removeFile = (key) => {
    if (previews[key]) URL.revokeObjectURL(previews[key]);
    setFiles((p) => ({ ...p, [key]: null }));
    setPreviews((p) => ({ ...p, [key]: null }));
    setErrors((p) => ({ ...p, [key]: "" }));
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validate()) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("shopName", formData.shopName);
      fd.append("shopAddress", formData.shopAddress);
      fd.append("shopCity", formData.shopCity);
      fd.append("shopMobile", formData.shopMobile);
      fd.append("gstNumber", formData.gstNumber || "");
      fd.append("shopPhoto", files.shopPhoto);
      fd.append("idProof", files.idProof);
      fd.append("license", files.license);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/verify/shop`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: fd,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage("Shop verification submitted successfully!");
        setFormData({ shopName: "", shopAddress: "", shopCity: "", shopMobile: "", gstNumber: "" });
        setFiles({ shopPhoto: null, idProof: null, license: null });
        Object.values(previews).forEach((u) => u && URL.revokeObjectURL(u));
        setPreviews({ shopPhoto: null, idProof: null, license: null });

        setTimeout(() => navigate("/user-dashboard"), 900);
      } else {
        setSuccessMessage(data.message || "Failed to submit verification.");
      }
    } catch (err) {
      console.error("Verification submit error:", err);
      setSuccessMessage("Server error while submitting. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const shortName = (name) => {
    if (!name) return "";
    if (name.length <= 34) return name;
    return name.slice(0, 20) + "..." + name.slice(-10);
  };

  return (
    <>
      {loading && (
        <div className="fullscreen-loader">
          <div className="loader-circle" />
          <p className="loader-text">{t("regLoading") || "Submitting..."}</p>
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
            background: "rgba(0,0,0,0.45)",
            padding: "36px 18px",
            borderRadius: "15px",
            maxWidth: "700px",
            width: "94%",
          }}
        >
          <h1 className="fw-bold text-uppercase mb-2 text-light">Shop Verification</h1>
          <h3 className="fw-light mb-4 text-light">Provide your shop details & upload documents</h3>

          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">

            {/* TEXT INPUTS (unchanged) */}
            <input
              ref={refs.shopName}
              type="text"
              name="shopName"
              placeholder="Shop name"
              className={`contact-input ${errors.shopName ? "input-error" : ""}`}
              value={formData.shopName}
              onChange={handleChange}
            />
            {errors.shopName && <p className="text-danger field-error">{errors.shopName}</p>}

            <input
              ref={refs.shopAddress}
              type="text"
              name="shopAddress"
              placeholder="Shop address"
              className={`contact-input ${errors.shopAddress ? "input-error" : ""}`}
              value={formData.shopAddress}
              onChange={handleChange}
            />
            {errors.shopAddress && <p className="text-danger field-error">{errors.shopAddress}</p>}

            <input
              ref={refs.shopCity}
              type="text"
              name="shopCity"
              placeholder="City / Area"
              className="contact-input"
              value={formData.shopCity}
              onChange={handleChange}
            />

            <input
              ref={refs.shopMobile}
              type="text"
              name="shopMobile"
              placeholder="Shop contact (10-digit)"
              className={`contact-input ${errors.shopMobile ? "input-error" : ""}`}
              value={formData.shopMobile}
              onChange={handleChange}
            />
            {errors.shopMobile && <p className="text-danger field-error">{errors.shopMobile}</p>}

            <input
              ref={refs.gstNumber}
              type="text"
              name="gstNumber"
              placeholder="GST Number (optional)"
              className={`contact-input ${errors.gstNumber ? "input-error" : ""}`}
              value={formData.gstNumber}
              onChange={handleChange}
            />
            {errors.gstNumber && <p className="text-danger field-error">{errors.gstNumber}</p>}

            {/* --- FILE FIELDS: single-row, identical look to contact-input, filename inline --- */}

            {/* Shop Photo */}
            <div className="file-wrapper" ref={refs.shopPhoto}>
              <label className="file-input-label">Upload: Shop Photo</label>

              <div className={`file-field ${errors.shopPhoto ? "input-error" : ""}`}>
                <label htmlFor="shopPhotoInput" className="file-btn">
                  {files.shopPhoto ? "Change file" : "Choose file"}
                </label>

                <input
                  id="shopPhotoInput"
                  type="file"
                  name="shopPhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                />

                <span className="file-title">{files.shopPhoto ? shortName(files.shopPhoto.name) : "No file chosen"}</span>
              </div>

              {errors.shopPhoto && <p className="field-error">{errors.shopPhoto}</p>}
            </div>

            {/* ID Proof */}
            <div className="file-wrapper" ref={refs.idProof}>
              <label className="file-input-label">Upload: ID Proof (Aadhar / Voter / Passport)</label>

              <div className={`file-field ${errors.idProof ? "input-error" : ""}`}>
                <label htmlFor="idProofInput" className="file-btn">
                  {files.idProof ? "Change file" : "Choose file"}
                </label>

                <input
                  id="idProofInput"
                  type="file"
                  name="idProof"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                />

                <span className="file-title">{files.idProof ? shortName(files.idProof.name) : "No file chosen"}</span>
              </div>

              {errors.idProof && <p className="field-error">{errors.idProof}</p>}
            </div>

            {/* License */}
            <div className="file-wrapper" ref={refs.license}>
              <label className="file-input-label">Upload: Shop License / Trade License</label>

              <div className={`file-field ${errors.license ? "input-error" : ""}`}>
                <label htmlFor="licenseInput" className="file-btn">
                  {files.license ? "Change file" : "Choose file"}
                </label>

                <input
                  id="licenseInput"
                  type="file"
                  name="license"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                />

                <span className="file-title">{files.license ? shortName(files.license.name) : "No file chosen"}</span>
              </div>

              {errors.license && <p className="field-error">{errors.license}</p>}
            </div>

            <button type="submit" className="submit pink-btn" disabled={loading} style={{ marginTop: 18, width: "100%" }}>
              {loading ? "Submitting..." : "Submit Verification"}
            </button>

            {successMessage && (
              <p className={`mt-3 ${successMessage.toLowerCase().includes("success") ? "text-success" : "text-danger"}`}>{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ShopVerification;
