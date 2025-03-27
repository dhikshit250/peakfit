import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faTachometerAlt, faBars, faTimes, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
        window.location.reload(); // Force refresh on login
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
                    <FontAwesomeIcon icon={faDumbbell} /> Workouts & Diet
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload(); // Force refresh on logout
                    }}
                  >
                    Logout
                  </button>
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
