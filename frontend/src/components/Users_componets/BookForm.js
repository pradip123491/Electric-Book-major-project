import React, { useState, useRef } from "react";
import "../../App.css";
import bg1 from "../../img/bg1.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BookForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { electricianId } = useParams();

  /* =====================
     REFS (FOR AUTO FOCUS)
  ===================== */
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const addressRef = useRef(null);

  /* =====================
     STATE
  ===================== */
  const [formData, setFormData] = useState({
    booking_date: "",
    booking_time: "",
    address: "",
    problem_description: "",
    payment_mode: "offline",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /* =====================
     VALIDATION (FOCUS FIRST ERROR)
  ===================== */
  const validate = () => {
    const newErrors = {};

    if (!formData.booking_date) {
      newErrors.booking_date = "Date is required";
      dateRef.current?.focus();
    } 
    else if (!formData.booking_time) {
      newErrors.booking_time = "Time is required";
      timeRef.current?.focus();
    } 
    else if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      addressRef.current?.focus();
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     HANDLE CHANGE
  ===================== */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMessage("");
  };

  /* =====================
     SUBMIT BOOKING
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bookings/create`, // ✅ FIXED URL
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            electrician_id: electricianId,
            ...formData,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Booking request submitted successfully");
        setTimeout(() => navigate("/your-bookings"), 1200);
      } else {
        setSuccessMessage(data.message || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setSuccessMessage("Server error");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <>
      {loading && (
        <div className="fullscreen-loader">
          <div className="loader-circle"></div>
          <p className="loader-text">Processing...</p>
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
            background: "rgba(0, 0, 0, 0.4)",
            padding: "40px 20px",
            borderRadius: "15px",
            maxWidth: "600px",
            width: "90%",
          }}
        >
          <h1 className="fw-bold text-uppercase mb-2">
            Book Electrician
          </h1>

          <h3 className="fw-light mb-5">
            Choose date & time for service
          </h3>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center animate-slide-up"
          >
            {/* DATE */}
            <input
              type="date"
              name="booking_date"
              ref={dateRef}
              className="contact-input"
              value={formData.booking_date}
              onChange={handleChange}
            />
            {errors.booking_date && (
              <p className="text-danger">{errors.booking_date}</p>
            )}

            {/* TIME */}
            <input
              type="time"
              name="booking_time"
              ref={timeRef}
              className="contact-input"
              value={formData.booking_time}
              onChange={handleChange}
            />
            {errors.booking_time && (
              <p className="text-danger">{errors.booking_time}</p>
            )}

            {/* ADDRESS */}
            <textarea
              name="address"
              ref={addressRef}
              placeholder="Service Address"
              className="contact-input"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-danger">{errors.address}</p>
            )}

            {/* PROBLEM */}
            <textarea
              name="problem_description"
              placeholder="Describe the problem (optional)"
              className="contact-input"
              rows="3"
              value={formData.problem_description}
              onChange={handleChange}
            />

            {/* PAYMENT */}
            <select
              name="payment_mode"
              className="contact-input"
              value={formData.payment_mode}
              onChange={handleChange}
            >
              <option value="offline">Offline Payment</option>
              <option value="online">Online (Scanner)</option>
            </select>

            {/* SUBMIT */}
            <button
              type="submit"
              className="submit pink-btn"
              disabled={loading}
            >
              Confirm Booking
            </button>

            {successMessage && (
              <p
                className={`mt-3 ${
                  successMessage.toLowerCase().includes("success")
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default BookForm;
