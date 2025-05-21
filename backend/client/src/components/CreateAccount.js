import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: Send form to API
    setRegistered(true);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Account</h1>
        {registered ? (
          <p style={successText}>
            ✅ Account created successfully! Please{" "}
            <Link to="/login" style={linkStyle}>
              login
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- Styling ---
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to right, #00c6ff, #0072ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "40px 30px",
  borderRadius: "15px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  maxWidth: "400px",
  width: "100%",
};

const titleStyle = {
  color: "#1F3B68",
  fontSize: "2rem",
  fontWeight: "700",
  marginBottom: "20px",
  textAlign: "center",
};

const labelStyle = {
  fontWeight: "600",
  color: "#333",
  display: "block",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#1F3B68",
  color: "white",
  border: "none",
  padding: "12px 20px",
  width: "100%",
  cursor: "pointer",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "background 0.3s",
};

const linkStyle = {
  color: "#1F3B68",
  fontWeight: "600",
  textDecoration: "underline",
};

const successText = {
  fontSize: "1.1rem",
  color: "#1F3B68",
  textAlign: "center",
  fontWeight: "600",
};

export default CreateAccount;
