const router = require("express").Router();
const passport = require("passport");


// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://dapper-zabaione-7a0fbb.netlify.app",
    failureRedirect: "https://dapper-zabaione-7a0fbb.netlify.app/login"
  })
);


// LinkedIn Login
router.get(
  "/linkedin",
  passport.authenticate("linkedin")
);


// LinkedIn Callback
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "https://dapper-zabaione-7a0fbb.netlify.app",
    failureRedirect: "https://dapper-zabaione-7a0fbb.netlify.app/login"
  })
);


module.exports = router;
