import React, { useState } from "react";
import "./styles/Header.css";
import { FaBell, FaSearch } from "react-icons/fa";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="mobile-header">
      <h2 className="logo">DigiRep</h2>

      <div className="header-icons">
        <FaSearch className="icon" />

        <div className="notification-wrapper">
          <FaBell
            className="icon"
            onClick={() => setShowNotifications(!showNotifications)}
          />

          {showNotifications && (
            <div className="notification-dropdown">
              <p>No new notifications</p>
              <p>This is a demo dropdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
