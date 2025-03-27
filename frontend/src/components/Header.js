import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faTachometerAlt, faBars, faTimes, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  // This state can be managed by your auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="header">
      <h2>
        <Link className="homebutton" to="/">PeakFit</Link>
      </h2>
      <nav>
        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/workout-diet">
                    <FontAwesomeIcon icon={faDumbbell} /> Workouts & Diet
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth">
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/workout-diet" onClick={closeMenu}>
                      <FontAwesomeIcon icon={faDumbbell} /> Workouts & Diet
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" onClick={closeMenu}>
                      <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/auth" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
