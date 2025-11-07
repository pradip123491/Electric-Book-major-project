import React from "react";
import "../App.css";

function About() {
  return (
    <div className="about-section text-white py-5 animate-fade-in">
      <div className="container mt-5">
        {/* Title */}
        <h1 className="display-4 fw-bold text-center text-uppercase mb-4">
          About <span className="text-danger">Electrician Book</span>
        </h1>

        {/* Intro Paragraph */}
        <p
          className="lead mx-auto"
          style={{
            maxWidth: "850px",
            lineHeight: "1.8",
            fontSize: "1.3rem",
            color: "#fff", // brighter text for readability
            textAlign: "justify",
          }}
        >
          <strong>Electrician Book</strong> is a modern digital platform that
          bridges the gap between customers and certified electricians. Our
          mission is to build a safe, transparent, and reliable network for
          electrical services across India. Every electrician on our platform
          undergoes verification to ensure quality, safety, and professionalism,
          empowering customers to make confident choices with trust and ease.
        </p>

        {/* Divider Line */}
        <div
          className="my-5 mx-auto"
          style={{
            height: "4px",
            width: "100px",
            background: "linear-gradient(90deg, #f40351, #ff9d00)",
            borderRadius: "10px",
          }}
        ></div>

        {/* Content Section */}
        <div className="row align-items-center mt-5">
          {/* Left Section */}
          <div className="col-md-7 animate-slide-left">
            <h2 className="fw-bold text-danger mb-3">Our Vision</h2>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              We believe that technology can empower both customers and
              professionals. <strong>Electrician Book</strong> is not just a
              listing site — it’s a complete ecosystem where trust meets
              technology. Our vision is to create a digital space that promotes
              fair opportunities for skilled electricians while giving users a
              smooth, transparent experience.
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              We aim to become India’s most reliable hub for electrical services,
              where customers can quickly connect with verified experts anytime,
              anywhere. Through innovation and dedication, we are lighting up
              the path toward a safer, smarter, and more connected future.
            </p>
          </div>

          {/* Right Icon Section */}
          <div className="col-md-5 text-center animate-slide-right">
            <i
              className="fas fa-bolt text-danger"
              style={{
                fontSize: "13rem",
                filter: "drop-shadow(0 0 35px #f40351)",
                animation: "boltGlow 3s infinite ease-in-out",
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
