const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateToken } = require('../Database/auth');

// @route   GET /auth/google
// @desc    Auth with Google
// @access  Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /auth/google/callback
// @desc    Google auth callback - Simplified
// @access  Public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/pages/signin.html' }),
  (req, res) => {
    // Simplified token generation
    const token = Buffer.from(JSON.stringify({
      id: req.user._id,
      isAdmin: req.user.isAdmin || false
    })).toString('base64');
    
    // Store user info in session for easy access
    req.session.user = {
      _id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin || false
    };
    
    // Redirect to frontend with token
    res.redirect(`/pages/landing.html?token=${token}`);
  }
);

// @route   POST /auth/login
// @desc    Login with local strategy - Simplified
// @access  Public
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }
    
    // Simplified token generation
    const token = Buffer.from(JSON.stringify({
      id: user._id,
      isAdmin: user.isAdmin || false
    })).toString('base64');
    
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      isAdmin: user.isAdmin || false,
      token
    });
  })(req, res, next);
});

// @route   GET /auth/logout
// @desc    Logout user
// @access  Private
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/pages/landing.html');
});

module.exports = router;