// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import mylogo from "./mylogo.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className="navbar">
      <div className="logo">
        <img src={mylogo} alt="logo" className="logo-image" />
        <h1 className="logo-text">
          Edu <span>Connect</span> Pro
        </h1>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
          <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        </ul>
      </nav>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </button>
    </header>
  );
};

export default Navbar;
