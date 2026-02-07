const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  linkedinUrl: String,

  hasVoted: {
    type: Boolean,
    default: false,
  },

  // NEW FIELD: store which candidate user voted for
  votedFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
