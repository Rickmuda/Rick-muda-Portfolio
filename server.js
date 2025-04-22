import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL || "https://mudaiscarry.github.io"] // Add your deployed frontend URL
      : ["http://localhost:5173", "http://127.0.0.1:5173"], // Development URLs
  credentials: true,
  optionsSuccessStatus: 200,
};

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
  });

// Guestbook Schema
const guestbookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const GuestbookEntry = mongoose.model("GuestbookEntry", guestbookSchema);

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Guestbook Routes
app.post("/guestbook", async (req, res) => {
  try {
    const { name, message } = req.body;
    const entry = new GuestbookEntry({ name, message });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ error: "Error creating guestbook entry" });
  }
});

app.get("/guestbook", async (req, res) => {
  try {
    const entries = await GuestbookEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Error fetching guestbook entries" });
  }
});

// Email Route
app.post("/send-email", async (req, res) => {
  const { email, fullName, message } = req.body;

  // Mailgun API configuration
  const mailgunDomain = process.env.MAILGUN_DOMAIN; // Your Mailgun domain
  const mailgunApiKey = process.env.MAILGUN_API_KEY; // Your Mailgun API key
  const mailgunUrl = `https://api.mailgun.net/v3/${mailgunDomain}/messages`;

  const formData = new URLSearchParams();
  formData.append("from", `${fullName} <${email}>`);
  formData.append("to", "rickmudaportfolio@gmail.com"); // Replace with your email address
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
      console.log("Email sent:", response.data);
      res.status(200).send("Email sent successfully");
    } else {
      console.error("Failed to send email:", response.data);
      res.status(500).send("Error sending email");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error sending email");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
