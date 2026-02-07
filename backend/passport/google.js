const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // IMPORTANT: use your Render URL
      callbackURL: "https://voting-platform.onrender.com/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {

      try {
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };

        return done(null, user);

      } catch (error) {
        return done(error, null);
      }
    }
  )
);


// serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});
