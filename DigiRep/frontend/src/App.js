import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import TimetableNotificationsModule from "./components/TimetableNotificationsModule";
import ClassroomModule from "./components/ClassroomModule";
import SocietyModule from "./components/SocietyModule";
import RankingModule from "./components/RankingModule";
import ResultPage from "./components/ResultPage";
import StudentProfilePage from "./components/StudentProfilePage";
import Timetable from "./components/Timetable";
import AttendanceTracker from "./components/AttendanceTracker";

import Sidebar from "./components/Sidebar";
import "./components/styles/Sidebar.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`app-root ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Hamburger / Cross Button */}
        {/* <button className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? "✕" : "☰"}
        </button> */}

         <button className="hamburger" onClick={toggleSidebar}>
          {isSidebarOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Right-side Content */}
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/timetable" element={<TimetableNotificationsModule />} />
            <Route path="/classroom" element={<ClassroomModule />} />
            <Route path="/society" element={<SocietyModule />} />
            <Route path="/ranking" element={<RankingModule />} />
            <Route path="/ranking/result" element={<ResultPage />} />
            <Route path="/ranking/student-profile" element={<StudentProfilePage />} />
            <Route path="/timetable/timetable-display" element={<Timetable />} />
            <Route path="/timetable/attendance-tracker" element={<AttendanceTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
