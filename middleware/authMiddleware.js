const User = require('../models/User');
const { verifyToken } = require('../Database/auth');

/**
 * Middleware to protect routes that require authentication
 * Verifies JWT token and attaches user to request object
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookie (for web clients)
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Middleware to restrict routes to admin users only
 * Must be used after protect middleware
 */
const admin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

/**
 * Middleware to check if user owns the resource or is admin
 * @param {string} userIdField - Path to user ID in request object
 */
const ownerOrAdmin = (userIdField) => {
  return (req, res, next) => {
    const resourceUserId = userIdField.split('.').reduce((obj, key) => obj?.[key], req);
    
    if (!resourceUserId) {
      return res.status(400).json({
        success: false,
        message: 'Resource owner not found'
      });
    }

    if (req.user.isAdmin || resourceUserId.toString() === req.user._id.toString()) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Not authorized to access this resource.'
      });
    }
  };
};

module.exports = { protect, admin, ownerOrAdmin };