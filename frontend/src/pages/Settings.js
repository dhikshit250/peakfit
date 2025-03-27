import React, { useState } from "react";
import "../styles/settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBell,
  faLanguage,
  faRuler,
  faPalette,
  faFont,
  faVolumeUp,
  faShieldAlt,
  faHistory,
  faSyncAlt,
  faDatabase,
  faCreditCard,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <nav>
        <ul>
          {/* Account Settings */}
          <li>
            <label>
              <FontAwesomeIcon icon={faBell} /> Notifications
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            </label>
          </li>
          <li>
            <label>
              <FontAwesomeIcon icon={faLanguage} /> Language Preferences
              <select>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
          </li>
          <li>
            <label>
              <FontAwesomeIcon icon={faRuler} /> Units (kg/cm - lbs/inches)
              <select>
                <option>Metric</option>
                <option>Imperial</option>
              </select>
            </label>
          </li>

          {/* App Preferences */}
          <li>
            <label>
              <FontAwesomeIcon icon={faPalette} /> Theme Customization
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </li>
          <li>
            <label>
              <FontAwesomeIcon icon={faFont} /> Font Size
              <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </li>
          <li>
            <label>
              <FontAwesomeIcon icon={faVolumeUp} /> Sound Effects
              <input type="checkbox" />
            </label>
          </li>

          {/* Security Settings */}
          <li>
            <button>
              <FontAwesomeIcon icon={faShieldAlt} /> Enable Two-Factor Authentication
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faSyncAlt} /> Log Out from All Devices
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faHistory} /> View Activity History
            </button>
          </li>

          {/* App Integrations */}
          <li>
            <button>
              <FontAwesomeIcon icon={faDatabase} /> Export Data
            </button>
          </li>

          {/* Subscription & Billing */}
          <li>
            <button>
              <FontAwesomeIcon icon={faCreditCard} /> Manage Payment Methods
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faHistory} /> View Subscription History
            </button>
          </li>

          {/* Account Deletion */}
          <li>
            <button className="delete-btn">
              <FontAwesomeIcon icon={faTrashAlt} /> Delete Account
            </button>
          </li>

          {/* Logout */}
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Settings;
