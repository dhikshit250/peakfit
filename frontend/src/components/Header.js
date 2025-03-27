import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDumbbell, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <h2>
        <Link className="homebutton" to="/">PeakFit</Link>
      </h2>
      <nav>
        <ul>
        <li><Link to="/workout-diet"><FontAwesomeIcon icon={faDumbbell} /> Workouts & Diet</Link></li>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
