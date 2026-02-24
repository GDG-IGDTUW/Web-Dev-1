const express = require('express');
const mongoose = require('mongoose');
const { sendTimetableUpdateEmail } = require("./services/emailService");
const cors = require('cors');
const jwt = require("jsonwebtoken");

// Import auth routes
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded JWT secret (must match auth.js)
const JWT_SECRET = "supersecretkey123";

// Replace 'digital_cr' with your Compass database name
const dbUrl = 'mongodb://localhost:27017/digital_cr'; 

mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB via Compass'))
  .catch((err) => console.error('Connection error:', err));


/* ================= JWT MIDDLEWARE ================= */

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};


/* ================= AUTH ROUTES ================= */

app.use("/api/auth", authRoutes);


/* ================= ATTENDANCE SCHEMA ================= */

const attendanceSchema = new mongoose.Schema({
    enrollment: String,
    name: String,
    subjects: {
        Math: Number,
        English: Number,
        Science: Number,
        History: Number
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);


/* ================= ATTENDANCE ROUTE ================= */

app.get('/api/attendance/:id', async (req, res) => {
    try {
        const student = await Attendance.findOne({ enrollment: req.params.id });
        if (!student) return res.status(404).json({ message: "Not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});


/* ================= CLASSROOM ROUTES ================= */

app.get(
  '/api/classrooms',
  verifyToken,
  authorizeRoles("CR", "Society Head"),
  async (req, res) => {
    try {
        const roomsData = {
            'CSE-ECE': [
                { room: 'Room 101', bookedSlots: { '9 AM - 10 AM': 'Class: Data Structures', '2 PM - 3 PM': 'Class: Physics' } },
                { room: 'Room 102', bookedSlots: { '11 AM - 12 PM': 'Society Event: Coding Workshop' } },
            ],
            IT: [
                { room: 'Room 103', bookedSlots: {} },
                { room: 'Room 104', bookedSlots: { '1 PM - 2 PM': 'Class: Algorithms' } },
            ],
            EXAM: [
                { room: 'Room 201', bookedSlots: { '9 AM - 10 AM': 'Final Exam' } },
                { room: 'Room 202', bookedSlots: {} },
            ],
            MAE: [
                { room: 'Room 301', bookedSlots: { '9 AM - 10 AM': 'Lab: Mechanical Engineering' } },
                { room: 'Room 302', bookedSlots: { '2 PM - 3 PM': 'Class: Thermodynamics' } },
            ],
        };
        res.json(roomsData);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch classrooms" });
    }
});


/* ================= TIMETABLE NOTIFICATION ================= */

app.post("/notify-timetable-update", async (req, res) => {
  const { link } = req.body;
  if (!link) return res.status(400).json({ message: "Link is required" });

  try {
    await sendTimetableUpdateEmail(studentEmails, link);
    res.json({ message: "Notifications sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send notifications" });
  }
});


/* ================= START SERVER ================= */

app.listen(5000, () => console.log('Server running on port 5000'));