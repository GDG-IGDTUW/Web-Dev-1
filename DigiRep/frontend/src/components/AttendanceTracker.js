import React, { useState } from "react";
import "./styles/AttendanceTracker.css";

const attendanceData = [
  {
    enrollment: "1",
    name: "Jane Smith",
    subjects: {
      Math: 90,
      English: 70,
      Science: 95,
      History: 80,
    },
  },
  {
    enrollment: "2",
    name: "John Doe",
    subjects: {
      Math: 75,
      English: 80,
      Science: 70,
      History: 65,
    },
  },
];

const AttendanceTracker = () => {
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [studentAttendance, setStudentAttendance] = useState(null);
  const [showContent, setShowContent] = useState(false); // State for showing content

  const handleSearch = async () => {
    if (!enrollmentNumber) return alert("Please enter an enrollment number.");
    
    try {
        const response = await fetch(`http://localhost:5000/api/attendance/${enrollmentNumber}`);
        const data = await response.json();
        
        if (response.ok) {
            setStudentAttendance(data);
        } else {
            setStudentAttendance(null);
            alert("No record found.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handlePreview = () => {
    setShowContent(true); // Show the content when preview button is clicked
  };

  return (
    <div className="attendance-tracker-page">
      <h2>Attendance Tracker (Under Development)</h2>

      <div className="development-banner">
        <p>This page is under development and will be available in the future!</p>
      </div>

      {/* Preview Button */}
      {!showContent && (
        <div className="preview-button">
          <button onClick={handlePreview} className="preview-btn">
            Preview
          </button>
        </div>
      )}

      {showContent && (
        <>
          <div className="enrollment-input">
            <input
              type="text"
              placeholder="Enter Enrollment Number"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {studentAttendance ? (
            <div className="attendance-details">
              <h3>{studentAttendance.name}</h3>
              <p>
                <strong>Enrollment Number:</strong> {studentAttendance.enrollment}
              </p>
              <h4>Subject-wise Attendance:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Attendance (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(studentAttendance.subjects).map(
                    ([subject, percentage], index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: percentage < 75 ? "red" : "white",
                          color: percentage < 75 ? "white" : "black",
                        }}
                      >
                        <td>{subject}</td>
                        <td>{percentage}%</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            enrollmentNumber && <p>No record found for this enrollment number.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceTracker;
