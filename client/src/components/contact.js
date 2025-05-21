import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={containerStyle}>
      {/* Animated floating circles */}
      <div style={floatingCircle(1)} />
      <div style={floatingCircle(2)} />
      <div style={floatingCircle(3)} />
      <div style={floatingCircle(4)} />

      <div style={cardStyle}>
        <h1 style={titleStyle}>Contact Us</h1>
        {submitted ? (
          <p style={thankYouStyle}>
            Thank you for reaching out! We'll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Your full name"
            />

            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="you@example.com"
            />

            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              style={textareaStyle}
              placeholder="Write your message here..."
            ></textarea>

            <button type="submit" style={buttonStyle}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // purple-blue gradient
  position: "relative",
  padding: "40px 15px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  overflow: "hidden",
};

const floatingCircle = (index) => ({
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  animation: `floatAnimation ${5 + index * 3}s ease-in-out infinite`,
  filter: "blur(30px)",
  // Random sizes and positions based on index:
  width: `${80 + index * 30}px`,
  height: `${80 + index * 30}px`,
  top: `${20 * index + 10}%`,
  left: `${15 * index + 10}%`,
  zIndex: 0,
});

const cardStyle = {
  backgroundColor: "#fff",
  maxWidth: "500px",
  width: "100%",
  padding: "40px 35px",
  borderRadius: "15px",
  boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
  border: "1px solid #e0e0e0",
  position: "relative",
  zIndex: 1,
};

const titleStyle = {
  color: "#4a2c7a",
  fontSize: "2.5rem",
  fontWeight: "700",
  marginBottom: "30px",
  textAlign: "center",
  letterSpacing: "1px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "8px",
  color: "#333",
  fontSize: "1.1rem",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: "25px",
  borderRadius: "8px",
  border: "1.8px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s ease",
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "120px",
};

const buttonStyle = {
  backgroundColor: "#4a2c7a",
  color: "white",
  border: "none",
  padding: "14px 25px",
  cursor: "pointer",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "1.1rem",
  letterSpacing: "0.7px",
  boxShadow: "0 6px 15px rgba(74,44,122,0.6)",
  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
};

const thankYouStyle = {
  fontSize: "1.3rem",
  color: "#4a2c7a",
  fontWeight: "600",
  textAlign: "center",
  padding: "30px 10px",
  borderRadius: "12px",
  backgroundColor: "#dcd6f7",
  border: "1px solid #b0a6f0",
  boxShadow: "0 4px 10px rgba(74,44,122,0.3)",
};

// Add keyframes via style tag or in your CSS
// Here is how you can add it in your CSS file:

/*

@keyframes floatAnimation {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

*/

// Or add this in your global CSS file for the floating animation effect.

export default Contact;
