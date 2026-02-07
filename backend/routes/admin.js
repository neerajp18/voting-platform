const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");
const User = require("../models/User");


// =====================
// ADMIN LOGIN
// =====================

router.post("/login", (req, res) => {

  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {

    return res.json({
      message: "Login successful"
    });

  }

  res.status(401).json({
    message: "Invalid credentials"
  });

});


// =====================
// ADD CANDIDATE
// =====================

router.post("/candidate", async (req, res) => {

  try {

    const { name, image, linkedinUrl } = req.body;

    const candidate = new Candidate({
      name,
      image,
      linkedinUrl,
      voteCount: 0
    });

    await candidate.save();

    res.json({
      message: "Candidate added"
    });

  } catch {

    res.status(500).json({
      message: "Error adding candidate"
    });

  }

});


// =====================
// DELETE CANDIDATE
// =====================

router.delete("/candidate/:id", async (req, res) => {

  try {

    await Candidate.findByIdAndDelete(req.params.id);

    res.json({
      message: "Candidate deleted"
    });

  } catch {

    res.status(500).json({
      message: "Error deleting candidate"
    });

  }

});


// =====================
// EDIT CANDIDATE
// =====================

router.put("/candidate/:id", async (req, res) => {

  try {

    const { name, image, linkedinUrl } = req.body;

    await Candidate.findByIdAndUpdate(

      req.params.id,

      {
        name,
        image,
        linkedinUrl
      }

    );

    res.json({
      message: "Candidate updated"
    });

  } catch {

    res.status(500).json({
      message: "Error updating candidate"
    });

  }

});


// =====================
// GET ALL CANDIDATES
// =====================

router.get("/candidates", async (req, res) => {

  const candidates = await Candidate.find();

  res.json(candidates);

});


// =====================
// RESET VOTES
// =====================

router.post("/reset", async (req, res) => {

  try {

    await Candidate.updateMany(
      {},
      { voteCount: 0 }
    );

    await User.updateMany(
      {},
      {
        hasVoted: false,
        votedFor: null
      }
    );

    res.json({
      message: "Votes reset"
    });

  } catch {

    res.status(500).json({
      message: "Error resetting votes"
    });

  }

});


module.exports = router;
