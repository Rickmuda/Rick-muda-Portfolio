import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

// Global error handler for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

// CORS configuration with specific options
const corsOptions = {
  origin: [
    "https://mudaiscarry.github.io", 
    "http://localhost:5173", 
    "https://www.rickmuda.nl" // Add your frontend domain here
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200,
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.use(cors());

// MySQL connection setup
const db = await mysql.createConnection({
  host: process.env.DATABASE_URL.split('@')[1].split(':')[0], // Extract host from DATABASE_URL
  user: process.env.DATABASE_URL.split('//')[1].split(':')[0], // Extract username
  password: process.env.DATABASE_URL.split(':')[2].split('@')[0], // Extract password
  database: process.env.DATABASE_URL.split('/')[1], // Extract database name
  port: process.env.DATABASE_URL.split(':')[2].split('/')[0], // Extract port
});

console.log("Successfully connected to MySQL database");

// Enable pre-flight requests for all routes
app.options("*", cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Guestbook Routes with MySQL
app.post("/guestbook", cors(corsOptions), async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validate input
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required." });
    }

    // Insert the guestbook entry into the database
    const [result] = await db.execute(
      "INSERT INTO guestbook (name, message, date) VALUES (?, ?, NOW())",
      [name, message]
    );

    // Respond with the created entry
    res.status(201).json({
      id: result.insertId,
      name,
      message,
      date: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    res.status(500).json({ error: "Failed to create guestbook entry." });
  }
});

app.get("/guestbook", cors(corsOptions), async (req, res) => {
  try {
    // Fetch all guestbook entries from the database
    const [entries] = await db.execute(
      "SELECT id, name, message, date FROM guestbook ORDER BY date DESC"
    );

    // Respond with the entries
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    res.status(500).json({ error: "Failed to fetch guestbook entries." });
  }
});

app.delete("/guestbook/:id", cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Entry ID is required." });
    }

    // Delete the guestbook entry from the database
    const [result] = await db.execute("DELETE FROM guestbook WHERE id = ?", [
      id,
    ]);

    // Check if the entry was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Guestbook entry not found." });
    }

    // Respond with success
    res.status(200).json({ message: "Guestbook entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting guestbook entry:", error);
    res.status(500).json({ error: "Failed to delete guestbook entry." });
  }
});

// Email Route with better error handling
app.post("/send-email", cors(corsOptions), async (req, res) => {
  const { email, fullName, message } = req.body;

  if (!email || !fullName || !message) {
    return res
      .status(400)
      .json({ error: "Email, full name, and message are required" });
  }

  // Mailgun API configuration
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunApiKey = process.env.MAILGUN_API_KEY;

  if (!mailgunDomain || !mailgunApiKey) {
    console.error("Missing Mailgun configuration");
    return res
      .status(500)
      .json({ error: "Email service not properly configured" });
  }

  const mailgunUrl = `https://api.mailgun.net/v3/${mailgunDomain}/messages`;

  const formData = new URLSearchParams();
  formData.append("from", `${fullName} <${email}>`);
  formData.append("to", "rickmudaportfolio@gmail.com");
  formData.append("subject", `New Contact Form Submission from ${fullName}`);
  formData.append(
    "text",
    `Email: ${email}\nName: ${fullName}\nMessage: ${message}`
  );

  try {
    const response = await axios.post(mailgunUrl, formData, {
      auth: {
        username: "api",
        password: mailgunApiKey,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      console.error("Failed to send email:", response.data);
      res.status(500).json({ error: "Error sending email" });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Error sending email" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start the Server with error handling
const server = app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });

app.use(cors(corsOptions));
