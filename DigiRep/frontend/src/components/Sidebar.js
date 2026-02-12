import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Highlight active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2>Digital CR</h2>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <Link
          to="/"
          className={isActive("/") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Home
        </Link>
        <Link
          to="/timetable"
          className={isActive("/timetable") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Timetable
        </Link>
        <Link
          to="/timetable/timetable-display"
          className={isActive("/timetable/timetable-display") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Timetable Display
        </Link>
        <Link
          to="/timetable/attendance-tracker"
          className={isActive("/timetable/attendance-tracker") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Attendance Tracker
        </Link>
        <Link
          to="/classroom"
          className={isActive("/classroom") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Classrooms
        </Link>
        <Link
          to="/society"
          className={isActive("/society") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Societies
        </Link>
        <Link
          to="/ranking"
          className={isActive("/ranking") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Ranking
        </Link>
        <Link
          to="/ranking/result"
          className={isActive("/ranking/result") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Result
        </Link>
        <Link
          to="/ranking/student-profile"
          className={isActive("/ranking/student-profile") ? "active" : ""}
          onClick={toggleSidebar}
        >
          Student Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
