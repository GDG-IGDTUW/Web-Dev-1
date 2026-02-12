const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or SendGrid
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendTimetableUpdateEmail = async (recipients, link) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients.join(","), // array of emails
      subject: "Timetable Updated",
      html: `
        <h3>Timetable Updated</h3>
        <p>The class schedule has been updated by your CR.</p>
        <a href="${link}">View updated timetable</a>
      `
    });
    console.log("Emails sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = { sendTimetableUpdateEmail };
