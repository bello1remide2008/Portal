import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-container">

          {/* Left Section - About App */}
          <div className="footer-about">
            <h2 className="footer-logo">Edu<span>Connect</span> Pro</h2>
            <p>
              Empowering students to find the best schools and tutorials that match their goals.
              Compare, register, and explore your learning opportunities with ease.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#schools">Schools</a></li>
              <li><a href="#Login">Login</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Get updates on new schools, scholarship alerts, and learning opportunities.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Contact and Socials */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><FaEnvelope /> info@tutorialfinder.com</p>
            <p><FaPhone /> +234 800 123 4567</p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a> 
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EduConnect Pro — All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
