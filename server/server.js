const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Google Sheets setup
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
  scopes: SCOPES,
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST route for contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  try {
    // Save to Google Sheets
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[name, email, mobile, message]],
      },
    });

    // Send notification to portfolio owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Request from ${name}`,
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Us!",
      text: `Hi ${name},\n\nThank you for reaching out! We'll get back to you soon.\n\nBest regards,\n[Your Name]`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});