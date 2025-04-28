const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Get Google OAuth credentials from environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback';

module.exports = function(passport) {
  // Local Strategy with improved error handling and validation
  passport.use(
    new LocalStrategy(
      { 
        usernameField: 'identifier',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, identifier, password, done) => {
        try {
          // Check if identifier is email or username
          const user = await User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
          });

          if (!user) {
            return done(null, false, { message: 'Invalid email/username or password' });
          }

          // Match password
          const isMatch = await user.matchPassword(password);
          if (!isMatch) {
            return done(null, false, { message: 'Invalid email/username or password' });
          }

          // Return user without sensitive data
          const userResponse = user.toObject();
          delete userResponse.password;
          return done(null, userResponse);
        } catch (err) {
          console.error('Local auth error:', err);
          return done(err);
        }
      }
    )
  );

  // Google OAuth Strategy with improved security and error handling
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_CALLBACK_URL,
          passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
              // Update user information if needed
              if (user.email !== profile.emails[0].value || 
                  user.displayName !== profile.displayName ||
                  user.avatar !== profile.photos[0].value) {
                user.email = profile.emails[0].value;
                user.displayName = profile.displayName;
                user.avatar = profile.photos[0].value;
                await user.save();
              }
              return done(null, user);
            }

            // Create new user with Google profile data
            const newUser = new User({
              googleId: profile.id,
              username: `google_${profile.id.substring(0, 8)}`,
              email: profile.emails[0].value,
              displayName: profile.displayName,
              avatar: profile.photos[0].value,
              password: Math.random().toString(36).slice(-8), // Random password for Google users
              preferences: {
                skillLevel: 'Beginner'
              }
            });

            user = await newUser.save();
            return done(null, user);
          } catch (err) {
            console.error('Google auth error:', err);
            return done(err);
          }
        }
      )
    );
  } else {
    console.warn('Google OAuth credentials not found. Google authentication will be disabled.');
  }

  // Serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session with error handling
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      console.error('Deserialize error:', err);
      done(err);
    }
  });
};