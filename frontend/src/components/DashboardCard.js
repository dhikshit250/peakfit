import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDumbbell, faUtensils, faChartLine, faCog } from "@fortawesome/free-solid-svg-icons";
import "../styles/dashboard.css";

const icons = {
  user: faUser,
  dumbbell: faDumbbell,
  utensils: faUtensils,
  "chart-line": faChartLine,
  cog: faCog,
};

const DashboardCard = ({ title, icon, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="dashboard-card" onClick={handleClick}>
      <FontAwesomeIcon icon={icons[icon]} className="card-icon" />
      <h3>{title}</h3>
    </div>
  );
};

export default DashboardCard;
