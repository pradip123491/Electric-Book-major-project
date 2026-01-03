import React, { useState, useRef } from "react";
import "../../App.css";
import bg1 from "../../img/bg1.jpg";
import { authFetch } from "../../utils/authFetch";

function AddMCQ() {
  const [form, setForm] = useState({
    q_en: "",
    q_gu: "",
    opt_en: ["", "", "", ""],
    opt_gu: ["", "", "", ""],
    answer: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const refs = useRef({});

  const scrollToField = (key) => {
    if (refs.current[key]) {
      refs.current[key].scrollIntoView({ behavior: "smooth", block: "center" });
      refs.current[key].focus();
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.q_en.trim()) newErrors.q_en = "Enter English question";
    if (!form.q_gu.trim()) newErrors.q_gu = "Enter Gujarati question";

    form.opt_en.forEach((o, i) => {
      if (!o.trim()) newErrors[`opt_en_${i}`] = "Required";
    });

    form.opt_gu.forEach((o, i) => {
      if (!o.trim()) newErrors[`opt_gu_${i}`] = "Required";
    });

    if (form.answer === "") newErrors.answer = "Select correct answer";

    setErrors(newErrors);

    const firstKey = Object.keys(newErrors)[0];
    if (firstKey) scrollToField(firstKey);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleOptionChange = (lang, i, value) => {
    const updated = [...form[lang]];
    updated[i] = value;
    setForm({ ...form, [lang]: updated });
    setErrors({ ...errors, [`${lang}_${i}`]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/mcq/add`,
        {
          method: "POST",
          body: JSON.stringify({
            question_en: form.q_en,
            question_gu: form.q_gu,
            options_en: form.opt_en,
            options_gu: form.opt_gu,
            answer: form.answer,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("MCQ Added Successfully");
        setForm({
          q_en: "",
          q_gu: "",
          opt_en: ["", "", "", ""],
          opt_gu: ["", "", "", ""],
          answer: "",
        });
        setErrors({});
      } else {
        alert(data.message || "Failed");
      }
    } catch (err) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="contact-page"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
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
          background: "rgba(0,0,0,0.5)",
          padding: "40px 20px",
          borderRadius: "15px",
          maxWidth: "750px",
          width: "95%",
        }}
      >
        <h1 className="text-light">Add New MCQ</h1>

        <form onSubmit={handleSubmit}>
          <input
            ref={(el) => (refs.current.q_en = el)}
            name="q_en"
            placeholder="Question (English)"
            className="contact-input"
            value={form.q_en}
            onChange={handleChange}
          />
          {errors.q_en && <p className="error-text">{errors.q_en}</p>}

          <input
            ref={(el) => (refs.current.q_gu = el)}
            name="q_gu"
            placeholder="પ્રશ્ન (ગુજરાતી)"
            className="contact-input"
            value={form.q_gu}
            onChange={handleChange}
          />
          {errors.q_gu && <p className="error-text">{errors.q_gu}</p>}

          <hr />

          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <input
                ref={(el) => (refs.current[`opt_en_${i}`] = el)}
                placeholder={`Option ${String.fromCharCode(65 + i)} (EN)`}
                className="contact-input"
                value={form.opt_en[i]}
                onChange={(e) =>
                  handleOptionChange("opt_en", i, e.target.value)
                }
              />
              <input
                ref={(el) => (refs.current[`opt_gu_${i}`] = el)}
                placeholder={`વિકલ્પ ${String.fromCharCode(65 + i)} (GU)`}
                className="contact-input"
                value={form.opt_gu[i]}
                onChange={(e) =>
                  handleOptionChange("opt_gu", i, e.target.value)
                }
              />
            </div>
          ))}

          <select
            ref={(el) => (refs.current.answer = el)}
            name="answer"
            className="contact-input"
            value={form.answer}
            onChange={handleChange}
          >
            <option value="">Select Correct Answer</option>
            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">C</option>
            <option value="3">D</option>
          </select>
          {errors.answer && <p className="error-text">{errors.answer}</p>}

          <button
            type="submit"
            className="submit pink-btn mt-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save MCQ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMCQ;
