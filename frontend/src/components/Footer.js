import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <h2>
            <a href="/">PeakFit</a>
          </h2>
        </div>
        {/* Navigation Links */}
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" />
          </a>
        </div>
        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()} PeakFit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
