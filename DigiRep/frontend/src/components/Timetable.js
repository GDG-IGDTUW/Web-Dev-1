import React, { useState } from "react";
import "./styles/Timetable.css";

const sampleTimetable = {
    CSE1: {
      "2027": {
        Monday: [
          { subject: "Maths", time: "9 AM", professor: "Dr. Sharma", room: "A101" },
          { subject: "Programming", time: "11 AM", professor: "Prof. Kumar", room: "B202" },
          { subject: "DBMS", time: "2 PM", professor: "Dr. Patel", room: "A201" },
        ],
        Tuesday: [
          { subject: "Data Structures", time: "10 AM", professor: "Prof. Singh", room: "C101" },
          { subject: "Algorithms", time: "1 PM", professor: "Dr. Gupta", room: "B301" },
          { subject: "English", time: "3 PM", professor: "Ms. Desai", room: "A102" },
        ],
        Wednesday: [
          { subject: "Operating Systems", time: "9 AM", professor: "Prof. Verma", room: "B203" },
          { subject: "Networks", time: "11 AM", professor: "Dr. Iyer", room: "C201" },
          { subject: "Cybersecurity", time: "2 PM", professor: "Dr. Nair", room: "A202" },
        ],
        Thursday: [
          { subject: "Discrete Math", time: "10 AM", professor: "Prof. Reddy", room: "B103" },
          { subject: "AI", time: "12 PM", professor: "Dr. Chatterjee", room: "C202" },
          { subject: "Ethics", time: "3 PM", professor: "Ms. Bhat", room: "A103" },
        ],
        Friday: [
          { subject: "Compiler Design", time: "9 AM", professor: "Prof. Saxena", room: "B204" },
          { subject: "Project Lab", time: "11 AM", professor: "Dr. Rao", room: "LAB101" },
          { subject: "Elective", time: "2 PM", professor: "Dr. Joshi", room: "A203" },
        ],
      },
    },
    CSE2: {
      "2027": {
        Monday: [
          { subject: "Digital Circuits", time: "9 AM", professor: "Prof. Nambiar", room: "B105" },
          { subject: "Data Science", time: "11 AM", professor: "Dr. Malhotra", room: "C103" },
          { subject: "Programming Lab", time: "2 PM", professor: "Ms. Roy", room: "LAB102" },
        ],
        Tuesday: [
          { subject: "Networks", time: "10 AM", professor: "Prof. Kapoor", room: "B305" },
          { subject: "DBMS", time: "1 PM", professor: "Dr. Sinha", room: "C203" },
          { subject: "English", time: "3 PM", professor: "Ms. Kulkarni", room: "A104" },
        ],
        Wednesday: [
          { subject: "Maths", time: "9 AM", professor: "Prof. Tripathi", room: "B205" },
          { subject: "Algorithms", time: "11 AM", professor: "Dr. Mishra", room: "C104" },
          { subject: "AI Lab", time: "2 PM", professor: "Prof. Das", room: "LAB103" },
        ],
        Thursday: [
          { subject: "Data Structures", time: "10 AM", professor: "Dr. Hegde", room: "B106" },
          { subject: "Discrete Math", time: "12 PM", professor: "Prof. Menon", room: "C204" },
          { subject: "OS Lab", time: "3 PM", professor: "Dr. Murthy", room: "LAB104" },
        ],
        Friday: [
          { subject: "Cybersecurity", time: "9 AM", professor: "Prof. Unnithan", room: "B306" },
          { subject: "Project Lab", time: "11 AM", professor: "Dr. Sengupta", room: "LAB105" },
          { subject: "Ethics", time: "2 PM", professor: "Ms. Ghosh", room: "A105" },
        ],
      },
    },
    CSE3: {
      "2027": {
        Monday: [
          { subject: "AI", time: "9 AM", professor: "Prof. Bose", room: "B107" },
          { subject: "DBMS", time: "11 AM", professor: "Dr. Mukherjee", room: "C105" },
          { subject: "Programming", time: "2 PM", professor: "Prof. Dutta", room: "B207" },
        ],
        Tuesday: [
          { subject: "Data Structures", time: "10 AM", professor: "Dr. Biswas", room: "C205" },
          { subject: "Elective", time: "1 PM", professor: "Prof. Gopal", room: "B108" },
          { subject: "Maths", time: "3 PM", professor: "Ms. Srivastava", room: "A106" },
        ],
        Wednesday: [
          { subject: "Algorithms", time: "9 AM", professor: "Prof. Harish", room: "B208" },
          { subject: "Operating Systems", time: "11 AM", professor: "Dr. Kumar", room: "C206" },
          { subject: "Networks", time: "2 PM", professor: "Prof. Arjun", room: "B109" },
        ],
        Thursday: [
          { subject: "Discrete Math", time: "10 AM", professor: "Dr. Subramanian", room: "C106" },
          { subject: "AI Lab", time: "12 PM", professor: "Prof. Raghavan", room: "LAB106" },
          { subject: "English", time: "3 PM", professor: "Ms. Anand", room: "A107" },
        ],
        Friday: [
          { subject: "Compiler Design", time: "9 AM", professor: "Prof. Ashok", room: "B209" },
          { subject: "Programming Lab", time: "11 AM", professor: "Dr. Vinod", room: "LAB107" },
          { subject: "Project", time: "2 PM", professor: "Dr. Priya", room: "C207" },
        ],
      },
    },
    CSEAI1: {
      "2027": {
        Monday: [
          { subject: "Maths", time: "9 AM", professor: "Prof. Sharma", room: "B110" },
          { subject: "AI Programming", time: "11 AM", professor: "Dr. Rajesh", room: "C107" },
          { subject: "Big Data", time: "2 PM", professor: "Prof. Anil", room: "B210" },
        ],
        Tuesday: [
          { subject: "Deep Learning", time: "10 AM", professor: "Dr. Suresh", room: "C208" },
          { subject: "Algorithms", time: "1 PM", professor: "Prof. Nagaraj", room: "B111" },
          { subject: "English", time: "3 PM", professor: "Ms. Kavya", room: "A108" },
        ],
        Wednesday: [
          { subject: "Operating Systems", time: "9 AM", professor: "Prof. Mohan", room: "B211" },
          { subject: "AI", time: "11 AM", professor: "Dr. Karthik", room: "C108" },
          { subject: "Cybersecurity", time: "2 PM", professor: "Prof. Sanjay", room: "B112" },
        ],
        Thursday: [
          { subject: "Machine Learning", time: "10 AM", professor: "Dr. Vikram", room: "C209" },
          { subject: "Discrete Math", time: "12 PM", professor: "Prof. Rahul", room: "B212" },
          { subject: "Ethics", time: "3 PM", professor: "Ms. Divya", room: "A109" },
        ],
        Friday: [
          { subject: "Compiler Design", time: "9 AM", professor: "Prof. Aryan", room: "B113" },
          { subject: "Project Lab", time: "11 AM", professor: "Dr. Rohan", room: "LAB108" },
          { subject: "Elective", time: "2 PM", professor: "Prof. Karan", room: "C210" },
        ],
      },
    },
    IT1: {
      "2027": {
        Monday: [
          { subject: "Database Systems", time: "9 AM", professor: "Prof. Nikhil", room: "B114" },
          { subject: "Programming", time: "11 AM", professor: "Dr. Arun", room: "C109" },
          { subject: "Elective", time: "2 PM", professor: "Prof. Vivek", room: "B213" },
        ],
        Tuesday: [
          { subject: "Data Structures", time: "10 AM", professor: "Dr. Ajay", room: "C211" },
          { subject: "Network Security", time: "1 PM", professor: "Prof. Siddharth", room: "B115" },
          { subject: "English", time: "3 PM", professor: "Ms. Neha", room: "A110" },
        ],
        Wednesday: [
          { subject: "Operating Systems", time: "9 AM", professor: "Prof. Sameer", room: "B214" },
          { subject: "Networks", time: "11 AM", professor: "Dr. Manoj", room: "C110" },
          { subject: "Cybersecurity", time: "2 PM", professor: "Prof. Haroon", room: "B116" },
        ],
        Thursday: [
          { subject: "Maths", time: "10 AM", professor: "Dr. Amitabh", room: "C212" },
          { subject: "Web Development", time: "12 PM", professor: "Prof. Gaurav", room: "B215" },
          { subject: "Big Data", time: "3 PM", professor: "Dr. Mayank", room: "C111" },
        ],
        Friday: [
          { subject: "Cloud Computing", time: "9 AM", professor: "Prof. Anurag", room: "B117" },
          { subject: "AI", time: "11 AM", professor: "Dr. Nitin", room: "C213" },
          { subject: "Project Lab", time: "2 PM", professor: "Prof. Sarthak", room: "LAB109" },
        ],
      },
    },
    IT2: {
      "2027": {
        Monday: [
          { subject: "Maths", time: "9 AM", professor: "Prof. Akash", room: "B118" },
          { subject: "Programming", time: "11 AM", professor: "Dr. Varun", room: "C112" },
          { subject: "Cloud Computing", time: "2 PM", professor: "Prof. Aditya", room: "B216" },
        ],
        Tuesday: [
          { subject: "Data Structures", time: "10 AM", professor: "Dr. Nikhil", room: "C214" },
          { subject: "AI", time: "1 PM", professor: "Prof. Bhavesh", room: "B119" },
          { subject: "Elective", time: "3 PM", professor: "Dr. Chetan", room: "A111" },
        ],
        Wednesday: [
          { subject: "Cybersecurity", time: "9 AM", professor: "Prof. Dhaval", room: "B217" },
          { subject: "Big Data", time: "11 AM", professor: "Dr. Eshwar", room: "C113" },
          { subject: "Networks", time: "2 PM", professor: "Prof. Faisal", room: "B120" },
        ],
        Thursday: [
          { subject: "Web Development", time: "10 AM", professor: "Dr. Gajanan", room: "C215" },
          { subject: "Project Management", time: "12 PM", professor: "Prof. Harshal", room: "B218" },
          { subject: "Ethics", time: "3 PM", professor: "Ms. Indu", room: "A112" },
        ],
        Friday: [
          { subject: "Cloud Computing", time: "9 AM", professor: "Prof. Jakhar", room: "B121" },
          { subject: "AI Lab", time: "11 AM", professor: "Dr. Kishan", room: "LAB110" },
          { subject: "Project", time: "2 PM", professor: "Prof. Lakshman", room: "C216" },
        ],
      },
    },
    AIML: {
      "2027": {
        Monday: [
          { subject: "Maths", time: "9 AM", professor: "Prof. Mohit", room: "B122" },
          { subject: "Machine Learning", time: "11 AM", professor: "Dr. Neeraj", room: "C114" },
          { subject: "Deep Learning", time: "2 PM", professor: "Prof. Omkar", room: "B219" },
        ],
        Tuesday: [
          { subject: "Data Structures", time: "10 AM", professor: "Dr. Pankaj", room: "C217" },
          { subject: "Python Programming", time: "1 PM", professor: "Prof. Quentin", room: "B123" },
          { subject: "English", time: "3 PM", professor: "Ms. Rani", room: "A113" },
        ],
        Wednesday: [
          { subject: "Neural Networks", time: "9 AM", professor: "Prof. Sachin", room: "B220" },
          { subject: "Operating Systems", time: "11 AM", professor: "Dr. Tushar", room: "C115" },
          { subject: "Cybersecurity", time: "2 PM", professor: "Prof. Uma", room: "B124" },
        ],
        Thursday: [
          { subject: "AI Lab", time: "10 AM", professor: "Dr. Vikas", room: "LAB111" },
          { subject: "Web Development", time: "12 PM", professor: "Prof. Wasim", room: "B221" },
          { subject: "Big Data", time: "3 PM", professor: "Dr. Xander", room: "C218" },
        ],
        Friday: [
          { subject: "AI Ethics", time: "9 AM", professor: "Prof. Yash", room: "B125" },
          { subject: "Compiler Design", time: "11 AM", professor: "Dr. Zainab", room: "C116" },
          { subject: "Project Lab", time: "2 PM", professor: "Prof. Arjun", room: "LAB112" },
        ],
      },
    },
  };
  

const Timetable = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isCR, setIsCR] = useState(false);
  const [updatedTimetable, setUpdatedTimetable] = useState(sampleTimetable);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [draggedSlot, setDraggedSlot] = useState(null);
  const [dragSource, setDragSource] = useState(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];

  const handleLogin = (e) => {
    e.preventDefault();
    const userId = e.target.userId.value;
    const password = e.target.password.value;

    if (userId === "CR-CSE1" && password === "CR-CSE1@27") {
      setIsCR(true);
      alert("Login successful! You can now update the timetable.");
    } elgetSlotForTimeDay = (day, time) => {
    return updatedTimetable[selectedDepartment]?.[selectedYear]?.[day]?.find(
      (slot) => slot.time === time
    ) || null;
  };

  const handleSlotClick = (day, time) => {
    const slot = getSlotForTimeDay(day, time);
    if (slot) {
      setSelectedSlot({ ...slot, day, time });
    }
  };

  const closeModal = () => {
    setSelectedSlot(null);
  };

  const handleDragStart = (e, day, time) => {
    const slot = getSlotForTimeDay(day, time);
    if (slot && isCR) {
      setDraggedSlot(slot);
      setDragSource({ day, time });
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetDay, targetTime) => {
    e.preventDefault();
    if (!draggedSlot || !dragSource || !isCR) return;

    setUpdatedTimetable((prev) => {
      const newTimetable = JSON.parse(JSON.stringify(prev));
      
      // Remove from source
      const sourceSlots = newTimetable[selectedDepartment][selectedYear][dragSource.day];
      const slotIndex = sourceSlots.findIndex((s) => s.subject === draggedSlot.subject);
      sourceSlots.splice(slotIndex, 1);
      
      // Add to target
      const targetSlots = newTimetable[selectedDepartment][selectedYear][targetDay];
      const existingIndex = targetSlots.findIndex((s) => s.time === targetTime);
      if (existingIndex >= 0) {
        targetSlots[existingIndex] = { ...draggedSlot, time: targetTime };
      } else {
        targetSlots.push({ ...draggedSlot, time: targetTime });
      }
      
      return newTimetable;
    });

    setDraggedSlot(null);
    setDragSource(null);
    alert("Class rescheduled successfully!");
  };
timetable-display">
          <h2>Interactive Timetable Grid {isCR && "(Drag to reschedule)"}</h2>
          <div className="grid-container">
            <div className="grid">
              <div className="grid-header"></div>
              {days.map((day) => (
                <div key={day} className="grid-day-header">
                  {day}
                </div>
              ))}
              {hours.map((hour) => (
                <React.Fragment key={hour}>
                  <div className="grid-hour-header">{hour}</div>
                  {days.map((day) => {
                    const slot = getSlotForTimeDay(day, hour);
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className={`grid-slot ${slot ? "occupied" : "empty"} ${draggedSlot?.subject === slot?.subject ? "dragging" : ""}`}
                        onClick={() => slot && handleSlotClick(day, hour)}
                        onDragStart={(e) => handleDragStart(e, day, hour)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, day, hour)}
                        draggable={slot && isCR ? true : false}
                      >
                        {slot ? (
                          <div className="slot-content">
                            <div className="slot-subject">{slot.subject}</div>
                            <div className="slot-info">{slot.room}</div>
                          </div>
                        ) : (
                          <div className="slot-empty">-</div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{selectedSlot.subject}</h2>
            <div className="modal-details">
              <p><strong>Day:</strong> {selectedSlot.day}</p>
              <p><strong>Time:</strong> {selectedSlot.time}</p>
              <p><strong>Professor:</strong> {selectedSlot.professor}</p>
              <p><strong>Room:</strong> {selectedSlot.room}</p>
            </div>
          </div>
        </div>
      )}

      {selectedDepartment && isCR && (
        <form className="update-form" onSubmit={handleUpdate}>
          <h2>Add New Class</h2>
          <input type="text" name="newSubject" placeholder="Subject (e.g., Maths)" required />
          <input type="text" name="newProfessor" placeholder="Professor Name" required />
          <input type="text" name="newRoom" placeholder="Room Number" required />
          <select name="newDay" required>
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select name="newTime" required>
            <option value="">Select Time</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <button type="submit" className="tt-btn">Add Class</button>
        </form>
      )}

      <div className="login-section">
        {!isCR && (
          <form onSubmit={handleLogin}>
            <h2>CR Login</h2>
            <input type="text" name="userId" placeholder="User ID" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" className="tt-btn">Login</button>
          </form>
        )}
        {isCR && (
          <button className="tt-btn" onClick={() => setIsCR(false)}>Logout</button

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
