import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { authFetch } from "../../utils/authFetch";
import defaultAvatar from "../../img/man.png";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    location: "",
    profile_image: null,
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // refs for auto focus
  const fullnameRef = useRef();
  const mobileRef = useRef();
  const locationRef = useRef();
  const fileRef = useRef();

  /* =====================
     LOAD PROFILE
  ===================== */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/user/me`
      );
      const data = await res.json();
      if (data.success) setUserData(data.data);
    } catch (err) {
      console.error("Profile load error", err);
    }
  };

  /* =====================
     INPUT HANDLERS
  ===================== */
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setErrors({ ...errors, profile_image: "" });
  };

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const newErrors = {};

    if (!userData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!/^[0-9]{10}$/.test(userData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    if (!userData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (file && file.size > 2 * 1024 * 1024) {
      newErrors.profile_image = "Image size must be less than 2MB";
    }

    setErrors(newErrors);

    // Auto focus first error
    if (newErrors.fullname) fullnameRef.current.focus();
    else if (newErrors.mobile) mobileRef.current.focus();
    else if (newErrors.location) locationRef.current.focus();
    else if (newErrors.profile_image) fileRef.current.focus();

    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     SAVE PROFILE
  ===================== */
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("fullname", userData.fullname);
      fd.append("mobile", userData.mobile);
      fd.append("location", userData.location);
      if (file) fd.append("profile_image", file);

      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/user/me`,
        {
          method: "PUT",
          body: fd,
        }
      );

      const json = await res.json();
      if (!json.success) throw new Error();

      setSuccessMessage(t("profileUpdated"));
      setFile(null);
      loadProfile();
    } catch {
      setErrors({ form: "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = userData.profile_image
    ? `${process.env.REACT_APP_API_URL}${userData.profile_image}`
    : defaultAvatar;

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">Saving...</p>
        </div>
      )}

      <div className="profile-page">
        <div className="text-center py-4 animate-fade-in" style={{ color: "#fff" }}>
          <h1>👤 {t("profileTitle")}</h1>
          <p>{t("profileSubtitle")}</p>
        </div>

        <div className="profile-form-container animate-slide-up">
          <form onSubmit={handleSave} className="profile-form">

            <div className="text-center mb-3">
              <img
                src={imageUrl}
                alt="Profile"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #fff",
                }}
              />
            </div>

            <label>
              {t("uploadProfile")} <span>(max 2MB)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
            />
            {errors.profile_image && (
              <p className="text-danger">{errors.profile_image}</p>
            )}

            <label>{t("fullName")}</label>
            <input
              ref={fullnameRef}
              name="fullname"
              value={userData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <p className="text-danger">{errors.fullname}</p>
            )}

            <label>{t("email")}</label>
            <input value={userData.email} disabled />

            <label>{t("mobileNumber")}</label>
            <input
              ref={mobileRef}
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <p className="text-danger">{errors.mobile}</p>
            )}

            <label>{t("location")}</label>
            <input
              ref={locationRef}
              name="location"
              value={userData.location}
              onChange={handleChange}
            />
            {errors.location && (
              <p className="text-danger">{errors.location}</p>
            )}

            {errors.form && (
              <p className="text-danger fw-bold">{errors.form}</p>
            )}

            {successMessage && (
              <p style={{ color: "#00ff00", fontWeight: "bold" }}>
                {successMessage}
              </p>
            )}

            <div className="profile-buttons">
              <button type="submit" className="pink-btn">
                {t("saveChanges")}
              </button>

              <button
                type="button"
                className="pink-btn"
                style={{ background: "#333" }}
                onClick={() => navigate("/changepassword")}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
