import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
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

// MongoDB Atlas connection with more detailed options
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://rickambergen25:ColuMpWJlJMBR0hn@portfolioguestbook.qn2unt1.mongodb.net/guestbook";

// More detailed connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: "majority",
};

// Connect with more detailed error handling
mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error details:", {
      message: err.message,
      code: err.code,
      name: err.name,
      stack: err.stack,
    });

    if (err.name === "MongooseServerSelectionError") {
      console.log("\nPossible solutions:");
      console.log("1. Add your IP address to MongoDB Atlas IP whitelist");
      console.log(
        "2. Check if your MongoDB Atlas username and password are correct"
      );
      console.log(
        "3. Ensure your MongoDB Atlas cluster is running and accessible"
      );
    }
    // Don't exit the process, let it continue running
  });

// Guestbook Schema
const guestbookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const GuestbookEntry = mongoose.model("GuestbookEntry", guestbookSchema);

// Enable pre-flight requests for all routes
app.options("*", cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Guestbook Routes with explicit CORS headers and better error handling
app.post("/guestbook", cors(corsOptions), async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }
    const entry = new GuestbookEntry({ name, message });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ error: "Error creating guestbook entry" });
  }
});

app.get("/guestbook", cors(corsOptions), async (req, res) => {
  try {
    const entries = await GuestbookEntry.find().sort({ date: -1 });
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
