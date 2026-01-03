import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import {
  enableStrictExamSecurity,
  disableStrictExamSecurity,
} from "../../utils/examSecurity";
import WarningModal from "./WarningModal";
import AlertBox from "./AlertBox";

const EXAM_DURATION_MINUTES = 30;

function MCQTest() {
  const lang = localStorage.getItem("testLang") || "en";
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);

  const [warningOpen, setWarningOpen] = useState(false);
  const [warningReason, setWarningReason] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const violationsRef = useRef(0);
  const timerRef = useRef(null);

  /* HIDE HEADER / FOOTER FOR EXAM */
  useEffect(() => {
    document.body.classList.add("exam-mode");
    return () => document.body.classList.remove("exam-mode");
  }, []);

  /* FULLSCREEN */
  useEffect(() => {
    const tryFS = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch {}
    };
    tryFS();
  }, []);

  /* FETCH QUESTIONS */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/mcq/random?limit=30&lang=${lang}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (data?.success) setQuestions(data.data || []);
        else setQuestions([]);
      } catch {
        setQuestions([]);
      }
      setLoading(false);
    };
    load();
  }, [lang]);

  /* TIMER */
  useEffect(() => {
    const saved = localStorage.getItem("examEndTime");
    if (saved) {
      setTimeLeft(Math.max(0, Math.floor((Number(saved) - Date.now()) / 1000)));
    } else {
      const end = Date.now() + EXAM_DURATION_MINUTES * 60 * 1000;
      localStorage.setItem("examEndTime", String(end));
      setTimeLeft(EXAM_DURATION_MINUTES * 60);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      // time up -> auto submit
      handleSubmit(true, false);
      return;
    }
    // clear previous interval (if any)
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  /* RESTORE ANSWERS */
  useEffect(() => {
    const saved = localStorage.getItem("examAnswers");
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("examAnswers", JSON.stringify(answers));
  }, [answers]);

  /* STRICT EXAM SECURITY */
  useEffect(() => {
    enableStrictExamSecurity((reason) => {
      violationsRef.current += 1;
      setWarningReason(reason);
      setWarningOpen(true);

      // First time = only warning
      if (violationsRef.current === 1) return;

      // Second time = close warning and auto submit
      if (violationsRef.current >= 2) {
        setWarningOpen(false);
        handleSubmit(false, true);
      }
    });

    return () => {
      disableStrictExamSecurity();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionClick = (qid, idx) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  /* always include all questions */
  const buildItemsPayload = () => {
    return questions.map((q) => {
      const user = answers[q.id] ?? null;
      const right = Number(q.correct_option);
      const ok = user !== null && user === right;
      return {
        question_id: q.id,
        user_answer: user,
        correct_option: right,
        is_correct: ok ? 1 : 0,
      };
    });
  };

  /* SUBMIT LOGIC */
  const handleSubmit = async (isTimeout = false, isViolation = false) => {
    // prevent double submits
    disableStrictExamSecurity();

    const items = buildItemsPayload();
    const totalQuestions = Math.max(questions.length, 1); // guard
    let correct = items.filter((x) => x.is_correct === 1).length;

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/mcqtest/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          lang,
          total: totalQuestions,
          correct,
          wrong: totalQuestions - correct,
          percentage: Math.round((correct / totalQuestions) * 100),
          duration_seconds:
            EXAM_DURATION_MINUTES * 60 - (typeof timeLeft === "number" ? timeLeft : 0),
          items,
          is_timeout: isTimeout ? 1 : 0,
          is_violation: isViolation ? 1 : 0,
        }),
      });

      if (isViolation) setAlertMsg("Test auto-submitted due to rule violation.");
      else if (isTimeout) setAlertMsg("Time's up — your test was auto-submitted.");
      else setAlertMsg("Your exam was submitted successfully!");

      setAlertOpen(true);
    } catch (err) {
      console.error("Submit error:", err);
      setAlertMsg("Submission error. Contact admin.");
      setAlertOpen(true);
    }

    // cleanup local storage and timer
    localStorage.removeItem("examEndTime");
    localStorage.removeItem("examAnswers");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // close alert and navigate to shop verification (absolute path)
  const closeAlert = async () => {
    setAlertOpen(false);

    // exit fullscreen if in it
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      // ignore
    }

    // remove exam mode class (header/footer)
    document.body.classList.remove("exam-mode");

    // small delay to ensure clean up
    setTimeout(() => {
      // IMPORTANT: use absolute path with leading slash
      navigate("/shop-verification");
    }, 150);
  };

  if (loading) return <div className="fullscreen-section text-white">Loading...</div>;
  if (!questions.length) return <div className="fullscreen-section text-white">No Questions Found</div>;

  const q = questions[currentIndex];
  const options = lang === "gu" ? q.options_gu : q.options_en;
  const safeOpts = [0, 1, 2, 3].map((i) => options[i] || "");

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="mcq-wrapper fullscreen-section animate-fade-in">
      <div className="timer-bar mcq-timer-fixed">
        ⏱ <b>{Math.floor((timeLeft / 60) || 0)}:{String((timeLeft || 0) % 60).padStart(2, "0")}</b>
      </div>

      <div className="mcq-layout">
        <div className="mcq-card">
          <h2 className="mcq-question-text">
            Q{currentIndex + 1}. {lang === "gu" ? q.question_gu : q.question_en}
          </h2>

          {safeOpts.map((opt, idx) => (
            <div
              key={idx}
              className={`mcq-option ${answers[q.id] === idx ? "selected" : ""}`}
              onClick={() => handleOptionClick(q.id, idx)}
            >
              <b>{String.fromCharCode(65 + idx)}.</b> {opt || "—"}
            </div>
          ))}

          <div className="mcq-footer">
            <button
              className="mcq-btn"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              ⬅ Prev
            </button>

            <button
              className="mcq-btn"
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next ➡
            </button>

            <button
              className="mcq-btn pink"
              onClick={() => handleSubmit(false, false)}
              disabled={!allAnswered}
              style={{
                opacity: !allAnswered ? 0.5 : 1,
                cursor: !allAnswered ? "not-allowed" : "pointer",
              }}
            >
              Submit Test
            </button>
          </div>
        </div>

        <div className="mcq-sidebar">
          <h3>Questions</h3>

          <div className="attempt-info">
            <span className="attempted">{Object.keys(answers).length} Attempted</span>
            <span className="remaining">
              {questions.length - Object.keys(answers).length} Remaining
            </span>
          </div>

          <div className="mcq-qmap">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                className={`qmap-btn ${answers[q.id] !== undefined ? "q-answered" : "q-not"}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <WarningModal
        show={warningOpen}
        reason={warningReason}
        onClose={() => setWarningOpen(false)}
      />

      <AlertBox show={alertOpen} type="success" message={alertMsg} onClose={closeAlert} />
    </div>
  );
}

export default MCQTest;
