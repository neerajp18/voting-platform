const router = require("express").Router();
const passport = require("passport");

// STEP 1: Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// STEP 2: Handle Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173"
  }),
  (req, res) => {
    // Send userId to frontend
    const userId = req.user._id;

    // Redirect with userId parameter
    res.redirect(`http://localhost:5173/candidates?userId=${userId}`);
  }
);

module.exports = router;
