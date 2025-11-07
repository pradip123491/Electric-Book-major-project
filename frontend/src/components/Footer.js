import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer text-center text-white">
      <div className="container">
        <p className="footer-text">
          We have a largest community of certified electrical engineers and
          electricians. With over{" "}
          <strong>10,000+ verified professionals</strong>, our website is 100%
          secure, trusted, and focused on connecting customers with reliable
          experts.
        </p>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Copyright —{" "}
        <span className="fw-bold">Electrician Book</span>
      </div>
    </footer>
  );
}

export default Footer;
