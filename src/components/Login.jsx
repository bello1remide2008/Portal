import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import "./Login.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      setLoading(true);

      // Save logged-in user's name
      localStorage.setItem("userName", formData.username);

      // Call parent login function ONLY if it exists
      if (typeof onLogin === "function") {
        onLogin(formData);
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

      return;
    }

    alert("Invalid credentials. Please try again or register.");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleAdminLogin = () => {
    navigate("/admin-login");
  };

  return (
    <div className="login-page">

      {/* Background decoration */}
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-wrapper">

        {/* LEFT SIDE */}
        <div className="login-intro">

          <div className="brand-mark">
            <div className="brand-icon">TF</div>

            <span>Edu Connect Pro</span>
          </div>

          <div className="intro-content">

            <p className="intro-label">
              YOUR LEARNING SPACE
            </p>

            <h1>
              Learn.
              <br />
              Grow.
              <br />
              <span>Achieve.</span>
            </h1>

            <p className="intro-text">
              Access your learning dashboard, assignments, subjects,
              results and school updates all in one place.
            </p>

          </div>

          <div className="intro-footer">
            <span>© 2026 Tutorial Finder</span>
            <span>Student Portal</span>
          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="login-panel">

          <div className="login-card">

            {/* MOBILE BRAND */}
            <div className="mobile-brand">
              <div className="brand-icon">TF</div>
              <span>Tutorial Finder</span>
            </div>


            {/* HEADER */}
            <div className="login-header">

              <div className="welcome-icon">
                <FaUser />
              </div>

              <div>
                <p className="small-label">
                  WELCOME BACK
                </p>

                <h2>
                  Sign in
                </h2>
              </div>

            </div>

            <p className="login-description">
              Enter your account details to continue to your dashboard.
            </p>


            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* USERNAME */}
              <div className="input-group">

                <label htmlFor="username">
                  Username
                </label>

                <div className="input-wrapper">

                  <FaUser className="input-icon" />

                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* EMAIL */}
              <div className="input-group">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">

                  <FaEnvelope className="input-icon" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="input-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">

                  <FaLock className="input-icon" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >

                {loading ? (
                  <span className="login-loading">
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign in
                    <FaArrowRight />
                  </>
                )}

              </button>

            </form>


            {/* CREATE ACCOUNT */}
            <p className="create-account">

              Don't have an account?

              <button
                type="button"
                onClick={handleCreateAccount}
              >
                Create one
              </button>

            </p>


            {/* DIVIDER */}
            <div className="login-divider">
              <span>OR</span>
            </div>


            {/* ADMIN LOGIN */}
            <button
              type="button"
              className="admin-login"
              onClick={handleAdminLogin}
            >

              <FaUserShield />

              <span>
                <strong>Administrator?</strong>
                <small>Sign in to the admin portal</small>
              </span>

              <FaArrowRight className="admin-arrow" />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;

