import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/logo.png";

const Auth = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "http://127.0.0.1:5000/api/auth/login"
        : "http://127.0.0.1:5000/api/auth/register";

      const body = isLogin
        ? { identifier, password }
        : { username, email: identifier, password };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials, please try again.");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true"); // Persist login state
        setIsLoggedIn(true);
        navigate("/"); // Redirect to home
      } else {
        alert("Sign-up successful! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="PeakFit Logo" className="logo" />
        <h2>{isLogin ? "Login to PeakFit" : "Create an Account"}</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder={isLogin ? "Username or Email" : "Email"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "New to PeakFit?" : "Already have an account?"}{" "}
          <span onClick={handleToggle}>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
