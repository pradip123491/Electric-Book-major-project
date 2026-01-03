import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Verify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  /* =========================
     BLOCK VERIFY PAGE IF:
     - pending (exam already given)
     - approved (already verified)
  ========================== */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/verification-status`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const status = data.status;

        if (status === "pending" || status === "approved") {
          // 🚫 Block access
          navigate("/user-dashboard", { replace: true });
        } else {
          // ✅ not_given or rejected → allow verify
          setLoading(false);
        }
      })
      .catch(() => {
        // fail-safe → allow verify
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center text-white">
        <h5>Checking verification status...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-white">
      {/* =========================
          YOUR EXISTING VERIFY UI
          (MCQ redirect / form)
      ========================== */}

      <h2 className="text-center mb-4">Verify Yourself</h2>

      {/* 🔽 KEEP YOUR EXISTING CONTENT BELOW */}
    </div>
  );
}

export default Verify;
