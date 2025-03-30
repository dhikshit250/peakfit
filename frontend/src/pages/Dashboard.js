import React from "react";
import DashboardCard from "../components/DashboardCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard title="Profile" icon="user" route="/profile" />
        <DashboardCard title="Customize Workout" icon="dumbbell" route="/workout-plan" />
        <DashboardCard title="Customize Diet" icon="utensils" route="/diet-plan" />
        <DashboardCard title="Progress" icon="chart-line" route="/progress" />
        <DashboardCard title="Settings" icon="cog" route="/settings" />
      </div>
    </div>
  );
};

export default Dashboard;
