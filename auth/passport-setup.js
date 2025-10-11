// auth/passport-setup.js
require('dotenv').config();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
  console.warn('WARNING: GitHub OAuth not configured. Skipping GitHub strategy registration.');
  console.warn('Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_CALLBACK_URL in .env (or Render) to enable OAuth.');
  module.exports = passport;
} else {
  passport.use(new GitHubStrategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));

  console.log('GitHub OAuth strategy registered.');
  module.exports = passport;
}
