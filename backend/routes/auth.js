const router = require("express").Router();
const passport = require("passport");


// Google login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://voting-platform.netlify.app",
    failureRedirect: "https://voting-platform.netlify.app/login"
  })
);


module.exports = router;
