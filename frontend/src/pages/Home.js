import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate("/auth");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Get Fit, Your Way!</h1>
        <p>Personalized workout & diet plans to achieve your fitness goals.</p>
        <button className="cta-button" onClick={handleStartJourney}>
          Start Your Fitness Journey
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose PeakFit?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>AI-Based Plans</h3>
            <p>Custom workouts & diet tailored to you.</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Track calories, workouts, and weight changes.</p>
          </div>
          <div className="feature-card">
            <h3>Diet Guidance</h3>
            <p>Meal plans suited for your body type & goal.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community">
        <h2>Join Our Community</h2>
        <p>
          Connect with fellow fitness enthusiasts, share tips, and stay motivated on your fitness journey.
        </p>
        <button className="cta-button" onClick={handleStartJourney}>
          Join Now
        </button>
      </section>
    </div>
  );
};

export default Home;
