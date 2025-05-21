import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div style={containerStyle}>
      <div style={glassCard}>
        <h1 style={headingStyle}>Welcome to FitZone</h1>
        <p style={textStyle}>Already have an account?</p>
        <Link to="/login" style={buttonStyle}>
          Login
        </Link>

        <p style={{ ...textStyle, marginTop: "30px" }}>
          New to FitZone? Create your account!
        </p>
        <Link to="/create-account" style={buttonStyle}>
          Create Account
        </Link>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #120746, #431A78, #1E4E79)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "'Poppins', sans-serif",
};

const glassCard = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  padding: "45px 35px",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  maxWidth: "420px",
  width: "100%",
  color: "#ffffff",
  textAlign: "center",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const headingStyle = {
  color: "#FFD700",
  marginBottom: "25px",
  fontWeight: "700",
  fontSize: "2rem",
};

const textStyle = {
  fontSize: "1.1rem",
  marginBottom: "15px",
  fontWeight: "400",
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 35px",
  backgroundColor: "#FFD700",
  color: "#120746",
  textDecoration: "none",
  borderRadius: "10px",
  fontWeight: "700",
  fontSize: "1rem",
  boxShadow: "0 6px 16px rgba(255, 215, 0, 0.4)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  marginTop: "10px",
};

export default Profile;
