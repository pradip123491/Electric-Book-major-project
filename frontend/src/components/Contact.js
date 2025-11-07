import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit number.";
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Enter a valid email.";
    if (!formData.message.trim())
      newErrors.message = "Please enter your message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Your message has been delivered. Thanks!");
      setFormData({ name: "", mobile: "", email: "", message: "" });
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
        <h1 className="fw-bold text-uppercase mb-2">SAY HELLO</h1>
        <h3 className="fw-light mb-5">We are always ready to serve you!</h3>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center animate-slide-up"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="contact-input"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}

          <input
            type="text"
            name="mobile"
            placeholder="Your mobile number"
            className="contact-input"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="text-danger">{errors.mobile}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="contact-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}

          <textarea
            name="message"
            placeholder="Enter your message"
            className="contact-input"
            rows="3"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="text-danger">{errors.message}</p>}

          <button type="submit" className="submit pink-btn">
            SEND MESSAGE
          </button>

        </form>
      </div>
    </div>
  );
}

export default Contact;
