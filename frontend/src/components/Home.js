import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home-page container text-center text-white py-5 animate-fade-in">
      <h1 className="display-3 fw-bold mt-5 mb-3 text-uppercase">
        Welcome to <span className="text-danger">Electrician Book</span>
      </h1>
      <p
        className="lead mx-auto"
        style={{
          maxWidth: "800px",
          lineHeight: "1.8",
          fontSize: "1.3rem",
          color: "#ddd",
          textAlign: "justify",
        }}
      >
        A trusted platform connecting customers with verified, skilled, and
        certified electricians. Whether you need quick home repairs or
        large-scale electrical projects, <strong>Electrician Book</strong> helps
        you find the right professional safely and efficiently.
      </p>

      <div
        className="my-5 mx-auto"
        style={{
          height: "4px",
          width: "100px",
          background: "linear-gradient(90deg, #f40351, #ff9d00)",
          borderRadius: "10px",
          animation: "slideUp 1s ease-in-out forwards",
        }}
      ></div>

      <p className="fs-5 text-light">
        Empowering the future of electrical services — fast, reliable, and
        100% verified.
      </p>
    </div>
  );
}

export default Home;
