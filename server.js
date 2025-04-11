import "dotenv/config"; // Load environment variables
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
  formData.append("text", `Email: ${email}\nName: ${fullName}\nMessage: ${message}`);

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

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});