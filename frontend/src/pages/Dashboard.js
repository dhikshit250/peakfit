import React from "react";
import DashboardCard from "../components/DashboardCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Profile" icon="user" route="/profile" />
        <DashboardCard title="Workout Plan" icon="dumbbell" route="/workout-plan" />
        <DashboardCard title="Diet Plan" icon="utensils" route="/diet-plan" />
        <DashboardCard title="Progress" icon="chart-line" route="/progress" />
        <DashboardCard title="Settings" icon="cog" route="/settings" />
      </div>
    </div>
  );
};

export default Dashboard;
