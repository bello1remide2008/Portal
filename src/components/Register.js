// RegisterModal.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ switchToLogin }) => {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const navigate = useNavigate();

  // Load students on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(saved);
  }, []);

  // Generate username
  useEffect(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setGeneratedUsername(`LYCSCHOOL${randomNum}`);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const updated = [
      ...students,
      {
        id: Date.now(),
        username: generatedUsername,
        firstName,
        lastName,
        phone,
        email,
        password,
        subjects: []
      }
    ];

    localStorage.setItem("students", JSON.stringify(updated));
    setStudents(updated);

    alert("Registration successful! You can now login.");
    navigate("/login");
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleRegister} className="modal-box">
        <h2>Create Account</h2>

        <label>Generated Username</label>
        <input type="text" value={generatedUsername} disabled />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-btn">Register</button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={switchToLogin} className="link">Sign in</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
