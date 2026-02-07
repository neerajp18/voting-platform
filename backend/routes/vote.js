const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Candidate = require("../models/Candidate");



/*
----------------------------------
CAST VOTE
POST /api/vote
----------------------------------
*/
router.post("/", async (req, res) => {

  try {

    const { userId, candidateId } = req.body;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check already voted
    if (user.votedFor) {

      return res.status(400).json({
        message: "User already voted"
      });

    }

    // Find candidate
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {

      return res.status(404).json({
        message: "Candidate not found"
      });

    }

    // Update candidate vote count
    candidate.voteCount += 1;

    await candidate.save();

    // Update user votedFor
    user.votedFor = candidate._id;

    await user.save();

    res.json({
      message: "Vote successful"
    });

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});



/*
----------------------------------
GET VOTERS LIST WITH LINKEDIN
GET /api/vote/voters
----------------------------------
*/
router.get("/voters", async (req, res) => {

  try {

    const users = await User.find({
      votedFor: { $ne: null }
    })
    .populate("votedFor");



    const voters = users.map(user => ({

      name: user.name,

      candidate: {
        name: user.votedFor.name,
        linkedinUrl: user.votedFor.linkedinUrl,
        image: user.votedFor.image,
        voteCount: user.votedFor.voteCount
      }

    }));



    res.json(voters);

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});



module.exports = router;
