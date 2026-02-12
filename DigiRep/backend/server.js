const express = require('express');
const mongoose = require('mongoose');
const { sendTimetableUpdateEmail } = require("./services/emailService");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace 'digital_cr' with your Compass database name
const dbUrl = 'mongodb://localhost:27017/digital_cr'; 

mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB via Compass'))
  .catch((err) => console.error('Connection error:', err));

// Define a Schema for Attendance (matching your frontend data)
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

// API Route to fetch student by enrollment
app.get('/api/attendance/:id', async (req, res) => {
    try {
        const student = await Attendance.findOne({ enrollment: req.params.id });
        if (!student) return res.status(404).json({ message: "Not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});

// const studentEmails = [
//   "student1@example.com",
//   "student2@example.com",
//   "student3@example.com"
// ];

// studentEmails will be fetched from the database

// Endpoint to notify students of timetable update
app.post("/notify-timetable-update", async (req, res) => {
  const { link } = req.body; // Link to the updated timetable
  if (!link) return res.status(400).json({ message: "Link is required" });

  try {
    await sendTimetableUpdateEmail(studentEmails, link);
    res.json({ message: "Notifications sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send notifications" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));