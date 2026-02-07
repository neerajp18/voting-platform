require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

// Load passport config
require("./passport/google");

const app = express();


// =======================
// CORS (IMPORTANT FIX)
// =======================

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://voting-platform.netlify.app"   // replace with your real Netlify URL
  ],
  credentials: true
}));


// =======================
// Middleware
// =======================

app.use(express.json());


// =======================
// Session
// =======================

app.use(
  session({
    secret: process.env.SESSION_SECRET || "vote-secret",
    resave: false,
    saveUninitialized: false,
  })
);


// =======================
// Passport
// =======================

app.use(passport.initialize());
app.use(passport.session());


// =======================
// Routes
// =======================

// Auth routes (Google & LinkedIn)
app.use("/auth", require("./routes/auth"));

// Vote route
app.use("/api/vote", require("./routes/vote"));

// Candidate route
app.use("/api/candidates", require("./routes/candidate"));

// Admin route
app.use("/api/admin", require("./routes/admin"));


// =======================
// Database
// =======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.error(err);
  });


// =======================
// Test Route
// =======================

app.get("/", (req, res) => {
  res.send("Voting backend running");
});


// =======================
// Start Server (IMPORTANT FIX FOR RENDER)
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
