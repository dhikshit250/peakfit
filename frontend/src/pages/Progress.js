import React from "react";
import "../styles/progress.css";

const Progress = () => {
  return (
    <div className="progress-container">
      <div className="progress-content">
        <h1>Progress Tracker</h1>

        <div className="progress-grid">
          <div className="progress-card">
            <h2>Workout Progress</h2>
            <p>Track sets, reps, and weights lifted.</p>
          </div>

          <div className="progress-card">
            <h2>Calories Burned</h2>
            <p>Based on workouts and activity data.</p>
          </div>

          <div className="progress-card">
            <h2>Body Weight & Fat</h2>
            <p>Monitor weight and fat percentage changes.</p>
          </div>

          <div className="progress-card">
            <h2>Step Count</h2>
            <p>Track daily movement and steps.</p>
          </div>

          <div className="progress-card">
            <h2>Heart Rate & Sleep</h2>
            <p>Analyze heart rate & sleep quality.</p>
          </div>

          <div className="progress-card">
            <h2>Water Intake</h2>
            <p>Compare water intake vs. goal.</p>
          </div>

          <div className="progress-card">
            <h2>Goal Completion</h2>
            <p>Visualize fitness journey progress.</p>
          </div>

          <div className="progress-card">
            <h2>Personal Records</h2>
            <p>Best lifts, longest workouts, and more.</p>
          </div>
        </div>

        <button className="view-reports-btn">View Reports</button>
      </div>
    </div>
  );
};

export default Progress;
