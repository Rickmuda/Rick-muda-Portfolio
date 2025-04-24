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
  origin: ["https://mudaiscarry.github.io", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// MySQL connection setup
const db = await mysql.createConnection({
  host: "localhost", // Replace with your MySQL host
  user: "rickmuda_portfolioguestbook", // Replace with your MySQL username
  password: "kN85phW2SqkENEGKD57Q", // Replace with your MySQL password
  database: "rickmuda_portfolioguestbook", // Replace with your MySQL database name
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
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const [result] = await db.execute(
      "INSERT INTO guestbook (name, message, date) VALUES (?, ?, NOW())",
      [name, message]
    );

    res.status(201).json({ id: result.insertId, name, message, date: new Date() });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ error: "Error creating guestbook entry" });
  }
});

app.get("/guestbook", cors(corsOptions), async (req, res) => {
  try {
    const [entries] = await db.execute("SELECT * FROM guestbook ORDER BY date DESC");
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Error fetching guestbook entries" });
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
