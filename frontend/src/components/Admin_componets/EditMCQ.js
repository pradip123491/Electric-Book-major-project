// src/components/Admin_componets/EditMCQ.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import bg1 from "../../img/bg1.jpg";
import { authFetch } from "../../utils/authFetch";

function EditMCQ() {
  const { id } = useParams();
  const navigate = useNavigate();
  const refs = useRef({});

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [form, setForm] = useState({
    q_en: "",
    q_gu: "",
    opt_en: ["", "", "", ""],
    opt_gu: ["", "", "", ""],
    answer: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) {
      navigate("/mcq-list");
      return;
    }
    fetchMCQ();
    // eslint-disable-next-line
  }, [id]);

  const fetchMCQ = async () => {
    setInitialLoading(true);
    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/mcq/${id}`
      );
      const data = await res.json();

      if (data.success && data.data) {
        const mcq = data.data;
        setForm({
          q_en: mcq.question_en || "",
          q_gu: mcq.question_gu || "",
          opt_en:
            Array.isArray(mcq.options_en) && mcq.options_en.length === 4
              ? mcq.options_en
              : ["", "", "", ""],
          opt_gu:
            Array.isArray(mcq.options_gu) && mcq.options_gu.length === 4
              ? mcq.options_gu
              : ["", "", "", ""],
          answer:
            typeof mcq.correct_option !== "undefined"
              ? String(mcq.correct_option)
              : "",
        });
      } else {
        alert("Failed to load MCQ");
        navigate("/mcq-list");
      }
    } catch (err) {
      console.error("Fetch MCQ error:", err);
      alert("Server error");
      navigate("/mcq-list");
    } finally {
      setInitialLoading(false);
    }
  };

  const scrollToField = (key) => {
    if (refs.current[key]) {
      refs.current[key].scrollIntoView({ behavior: "smooth", block: "center" });
      refs.current[key].focus();
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.q_en.trim()) newErrors.q_en = "⚠ Enter the English question";
    if (!form.q_gu.trim()) newErrors.q_gu = "⚠ ગુજરાતી પ્રશ્ન દાખલ કરો";

    form.opt_en.forEach((opt, i) => {
      if (!opt.trim())
        newErrors[`opt_en_${i}`] = `⚠ Enter Option ${String.fromCharCode(
          65 + i
        )} (English)`;
    });

    form.opt_gu.forEach((opt, i) => {
      if (!opt.trim())
        newErrors[`opt_gu_${i}`] = `⚠ વિકલ્પ ${String.fromCharCode(
          65 + i
        )} (ગુજરાતી) દાખલ કરો`;
    });

    if (form.answer === "") newErrors.answer = "⚠ Select correct answer";

    setErrors(newErrors);

    const firstKey = Object.keys(newErrors)[0];
    if (firstKey) scrollToField(firstKey);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleOptionChange = (lang, index, value) => {
    const updated = [...form[lang]];
    updated[index] = value;
    setForm({ ...form, [lang]: updated });
    setErrors({ ...errors, [`${lang}_${index}`]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      question_en: form.q_en,
      question_gu: form.q_gu,
      options_en: form.opt_en,
      options_gu: form.opt_gu,
      answer: form.answer,
    };

    try {
      const res = await authFetch(
        `${process.env.REACT_APP_API_URL}/api/mcq/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("MCQ updated successfully!");
        navigate("/mcq-list");
      } else {
        alert("Update failed: " + (data.message || ""));
      }
    } catch (err) {
      console.error("Update MCQ error:", err);
      alert("Server error while updating");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container text-center animate-fade-in"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          padding: "40px 20px",
          borderRadius: "15px",
          maxWidth: "750px",
          width: "95%",
        }}
      >
        <h1 className="fw-bold text-uppercase mb-2 text-light">Edit MCQ</h1>
        <h4 className="fw-light mb-4 text-light">
          Update bilingual MCQ
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            ref={(el) => (refs.current.q_en = el)}
            type="text"
            name="q_en"
            placeholder="Question (English)"
            className={`contact-input ${errors.q_en ? "error-input" : ""}`}
            value={form.q_en}
            onChange={handleChange}
          />
          {errors.q_en && <p className="error-text">{errors.q_en}</p>}

          <input
            ref={(el) => (refs.current.q_gu = el)}
            type="text"
            name="q_gu"
            placeholder="પ્રશ્ન (ગુજરાતી)"
            className={`contact-input ${errors.q_gu ? "error-input" : ""}`}
            value={form.q_gu}
            onChange={handleChange}
          />
          {errors.q_gu && <p className="error-text">{errors.q_gu}</p>}

          <hr className="text-light" />

          <h5 className="text-light mt-3 mb-3">Options</h5>

          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="mb-3">
              <input
                ref={(el) => (refs.current[`opt_en_${i}`] = el)}
                type="text"
                placeholder={`Option ${String.fromCharCode(
                  65 + i
                )} (English)`}
                className={`contact-input ${
                  errors[`opt_en_${i}`] ? "error-input" : ""
                }`}
                value={form.opt_en[i]}
                onChange={(e) =>
                  handleOptionChange("opt_en", i, e.target.value)
                }
              />
              {errors[`opt_en_${i}`] && (
                <p className="error-text">
                  {errors[`opt_en_${i}`]}
                </p>
              )}

              <input
                ref={(el) => (refs.current[`opt_gu_${i}`] = el)}
                type="text"
                placeholder={`વિકલ્પ ${String.fromCharCode(
                  65 + i
                )} (ગુજરાતી)`}
                className={`contact-input ${
                  errors[`opt_gu_${i}`] ? "error-input" : ""
                }`}
                value={form.opt_gu[i]}
                onChange={(e) =>
                  handleOptionChange("opt_gu", i, e.target.value)
                }
              />
              {errors[`opt_gu_${i}`] && (
                <p className="error-text">
                  {errors[`opt_gu_${i}`]}
                </p>
              )}
            </div>
          ))}

          <select
            ref={(el) => (refs.current.answer = el)}
            name="answer"
            className={`contact-input ${
              errors.answer ? "error-input" : ""
            }`}
            value={form.answer}
            onChange={handleChange}
          >
            <option value="">Select Correct Answer</option>
            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">C</option>
            <option value="3">D</option>
          </select>
          {errors.answer && (
            <p className="error-text">{errors.answer}</p>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginTop: "20px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              type="submit"
              className="submit pink-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="submit pink-btn"
              onClick={() => navigate("/mcq-list")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMCQ;
