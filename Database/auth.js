<<<<<<< HEAD
const jwt = require('jsonwebtoken');

// Get JWT secret from environment variable or use a secure default
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate JWT token for authenticated user
 * @param {string} userId - User's ID
 * @param {boolean} isAdmin - User's admin status
 * @returns {string} JWT token
 */
const generateToken = (userId, isAdmin = false) => {
    return jwt.sign(
        { id: userId, isAdmin },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

/**
 * Verify JWT token and return decoded payload
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error.message);
        return null;
    }
};

module.exports = { generateToken, verifyToken };
=======
const jwt = require('jsonwebtoken');

const generateToken = (userId, isAdmin = false) => {
    return jwt.sign(
        { 
            id: userId,
            isAdmin 
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

module.exports = { generateToken, verifyToken }; 
>>>>>>> 088e4bc57b5299788084a8bd1b5330d0213972cb
