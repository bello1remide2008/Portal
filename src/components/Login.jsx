 import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin, onAdminLogin }) => {
  const [loginType, setLoginType] = useState("user"); // user | admin
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const storedUsername = localStorage.getItem("userUsername");
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

     if (
      formData.username === storedUsername &&
      formData.email === storedEmail &&
      formData.password === storedPassword
    ) {
      alert(`Welcome back, ${storedUsername}!`);
      
      // ✅ CALL onLogin ONLY HERE
      if (onLogin) {
        onLogin(formData);
      }

      // ✅ NAVIGATE ONCE
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again or register.");
    }
     

    if (loginType === "admin") {
      onAdminLogin(formData);
    } else {
      onLogin(formData);
    }
  };
  const handleCreateAccount = () => {
    navigate("/register"); // ✅ lowercase
  };
  return (
    <div className="form-container">
      <div className="login-card">
        {/* LOGIN CHOICE */}
        <div className="login-choice">
          

          <button
            className={loginType === "admin" ? "active" : ""}
            onClick={() => navigate("/admin-login")}
          >
            Admin Login
          </button>
        </div>

        <h2>
          {loginType === "admin" ? "Admin Login" : "Student Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          
           <p className="redirect-text">
        Don’t have an account?{" "}
        <span
          
          className="link"
          style={{ color: "#007bff", cursor: "pointer" }}
        >
          Create one
        </span>
      </p>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
