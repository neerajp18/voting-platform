require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

require("./passport/google");

const app = express();


// =======================
// Middleware
// =======================

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());


// =======================
// Session
// =======================

app.use(
  session({
    secret: "vote-secret",
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

app.use("/auth", require("./routes/auth"));

app.use("/api/vote", require("./routes/vote"));

app.use("/api/candidates", require("./routes/candidate"));

// ✅ NEW ADMIN ROUTE
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
// Start Server
// =======================

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
