const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({

  name: String,

  image: String,

  linkedinUrl: String,

  voteCount: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Candidate", CandidateSchema);
