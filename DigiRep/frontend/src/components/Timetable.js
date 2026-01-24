import React, { useState } from "react";
import "./styles/Timetable.css";

const sampleTimetable = {
    CSE1: {
      "2027": {
        Monday: ["Maths - 9 AM", "Programming - 11 AM", "DBMS - 2 PM"],
        Tuesday: ["Data Structures - 10 AM", "Algorithms - 1 PM", "English - 3 PM"],
        Wednesday: ["Operating Systems - 9 AM", "Networks - 11 AM", "Cybersecurity - 2 PM"],
        Thursday: ["Discrete Math - 10 AM", "AI - 12 PM", "Ethics - 3 PM"],
        Friday: ["Compiler Design - 9 AM", "Project Lab - 11 AM", "Elective - 2 PM"],
      },
    },
    CSE2: {
      "2027": {
        Monday: ["Digital Circuits - 9 AM", "Data Science - 11 AM", "Programming Lab - 2 PM"],
        Tuesday: ["Networks - 10 AM", "DBMS - 1 PM", "English - 3 PM"],
        Wednesday: ["Maths - 9 AM", "Algorithms - 11 AM", "AI Lab - 2 PM"],
        Thursday: ["Data Structures - 10 AM", "Discrete Math - 12 PM", "OS Lab - 3 PM"],
        Friday: ["Cybersecurity - 9 AM", "Project Lab - 11 AM", "Ethics - 2 PM"],
      },
    },
    CSE3: {
      "2027": {
        Monday: ["AI - 9 AM", "DBMS - 11 AM", "Programming - 2 PM"],
        Tuesday: ["Data Structures - 10 AM", "Elective - 1 PM", "Maths - 3 PM"],
        Wednesday: ["Algorithms - 9 AM", "Operating Systems - 11 AM", "Networks - 2 PM"],
        Thursday: ["Discrete Math - 10 AM", "AI Lab - 12 PM", "English - 3 PM"],
        Friday: ["Compiler Design - 9 AM", "Programming Lab - 11 AM", "Project - 2 PM"],
      },
    },
    CSEAI1: {
      "2027": {
        Monday: ["Maths - 9 AM", "AI Programming - 11 AM", "Big Data - 2 PM"],
        Tuesday: ["Deep Learning - 10 AM", "Algorithms - 1 PM", "English - 3 PM"],
        Wednesday: ["Operating Systems - 9 AM", "AI - 11 AM", "Cybersecurity - 2 PM"],
        Thursday: ["Machine Learning - 10 AM", "Discrete Math - 12 PM", "Ethics - 3 PM"],
        Friday: ["Compiler Design - 9 AM", "Project Lab - 11 AM", "Elective - 2 PM"],
      },
    },
    IT1: {
      "2027": {
        Monday: ["Database Systems - 9 AM", "Programming - 11 AM", "Elective - 2 PM"],
        Tuesday: ["Data Structures - 10 AM", "Network Security - 1 PM", "English - 3 PM"],
        Wednesday: ["Operating Systems - 9 AM", "Networks - 11 AM", "Cybersecurity - 2 PM"],
        Thursday: ["Maths - 10 AM", "Web Development - 12 PM", "Big Data - 3 PM"],
        Friday: ["Cloud Computing - 9 AM", "AI - 11 AM", "Project Lab - 2 PM"],
      },
    },
    IT2: {
      "2027": {
        Monday: ["Maths - 9 AM", "Programming - 11 AM", "Cloud Computing - 2 PM"],
        Tuesday: ["Data Structures - 10 AM", "AI - 1 PM", "Elective - 3 PM"],
        Wednesday: ["Cybersecurity - 9 AM", "Big Data - 11 AM", "Networks - 2 PM"],
        Thursday: ["Web Development - 10 AM", "Project Management - 12 PM", "Ethics - 3 PM"],
        Friday: ["Cloud Computing - 9 AM", "AI Lab - 11 AM", "Project - 2 PM"],
      },
    },
    AIML: {
      "2027": {
        Monday: ["Maths - 9 AM", "Machine Learning - 11 AM", "Deep Learning - 2 PM"],
        Tuesday: ["Data Structures - 10 AM", "Python Programming - 1 PM", "English - 3 PM"],
        Wednesday: ["Neural Networks - 9 AM", "Operating Systems - 11 AM", "Cybersecurity - 2 PM"],
        Thursday: ["AI Lab - 10 AM", "Web Development - 12 PM", "Big Data - 3 PM"],
        Friday: ["AI Ethics - 9 AM", "Compiler Design - 11 AM", "Project Lab - 2 PM"],
      },
    },
  };
  

const Timetable = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isCR, setIsCR] = useState(false);
  const [updatedTimetable, setUpdatedTimetable] = useState(sampleTimetable);

  const handleLogin = (e) => {
    e.preventDefault();
    const userId = e.target.userId.value;
    const password = e.target.password.value;

    if (userId === "CR-CSE1" && password === "CR-CSE1@27") {
      setIsCR(true);
      alert("Login successful! You can now update the timetable.");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleUpdate = async (e) => {
  e.preventDefault();
  const newSubject = e.target.newSubject.value.trim();
  const newTime = e.target.newTime.value.trim();

  if (newSubject && newTime && selectedYear && selectedDepartment && selectedDay) {
    const newSchedule = `${newSubject} - ${newTime}`;
    setUpdatedTimetable((prev) => ({
      ...prev,
      [selectedDepartment]: {
        ...prev[selectedDepartment],
        [selectedYear]: {
          ...prev[selectedDepartment][selectedYear],
          [selectedDay]: [...(prev[selectedDepartment][selectedYear][selectedDay] || []), newSchedule],
        },
      },
    }));
    e.target.reset();

    alert("Timetable updated successfully!");

    // Call backend to notify students
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/notify-timetable-update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: window.location.href })
      });
      alert("Students have been notified via email!");
    } catch (err) {
      console.error(err);
      alert("Failed to notify students.");
    }
  } else {
    alert("Please fill in all fields and select year, department, and day!");
  }
};


  return (
    <div className="timetable-container">
      <h1>Timetable</h1>
      <div className="year-selector">
        <h2>Select Year</h2>
        <button
          className={`tt-btn ${selectedYear === "2027" ? "tt-btn-selected" : ""}`}
          onClick={() => setSelectedYear("2027")}
        >
          2027
        </button>
        <button
          className={`tt-btn ${selectedYear === "2028" ? "tt-btn-selected" : ""}`}
          onClick={() => setSelectedYear("2028")}
        >
          2028
        </button>
      </div>

      {selectedYear && (
        <div className="department-selector">
          <h2>Select Department</h2>
          {Object.keys(sampleTimetable).map((dept) => (
            <button
              key={dept}
              className={`tt-btn ${selectedDepartment === dept ? "tt-btn-selected" : ""}`}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      )}

      {selectedDepartment && (
        <div className="day-selector">
          <h2>Select Day</h2>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <button
              key={day}
              className={`tt-btn ${selectedDay === day ? "tt-btn-selected" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {selectedDay && (
        <div className="timetable-display">
          <h2>Timetable for {selectedDay}</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {updatedTimetable[selectedDepartment]?.[selectedYear]?.[selectedDay]?.map((item, index) => {
                const [subject, time] = item.split(" - ");
                return (
                  <tr key={index}>
                    <td>{time}</td>
                    <td>{subject}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedDay && isCR && (
        <form className="update-form" onSubmit={handleUpdate}>
          <h2>Update Timetable</h2>
          <input type="text" name="newSubject" placeholder="Enter subject (e.g., Maths)" />
          <input type="text" name="newTime" placeholder="Enter time (e.g., 9 AM)" />
          <button type="submit" className="tt-btn">Update</button>
        </form>
      )}

      <div className="login-section">
        {!isCR && (
          <form onSubmit={handleLogin}>
            <h2>CR Login</h2>
            <input type="text" name="userId" placeholder="User ID" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit" className="tt-btn">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Timetable;
