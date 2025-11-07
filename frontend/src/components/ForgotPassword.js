import React, { useState } from "react";
import "../App.css";
import bg1 from "../img/bg1.jpg";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
            setError("Please enter a valid email address.");
            return;
        }
        alert("Password reset link sent to your email!");
        setEmail("");
        setError("");
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
            }}
        >
            <div className="container text-center animate-fade-in">
                <h1 className="fw-bold text-uppercase mb-2">Forgot Password</h1>
                <h3 className="fw-light mb-5">
                    Enter your email to receive a reset link
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center animate-slide-up"
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="contact-input"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                    />
                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="submit pink-btn">
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>


    );
}

export default ForgotPassword;
