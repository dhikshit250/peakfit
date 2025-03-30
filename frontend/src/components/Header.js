import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faCalendarCheck,faTachometerAlt, faBars, faTimes, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/header.css";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext); // Get login state from context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="header">
      <h2>
        <Link className="homebutton" to="/">PeakFit</Link>
      </h2>
      <nav>
        <div className="desktop-menu">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/workout-diet">
                  <FontAwesomeIcon icon={faCalendarCheck} /> Today's Plan
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
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
        </div>
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
