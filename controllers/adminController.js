/**
 * Admin controller with hardcoded credentials
 * SIMPLIFIED VERSION - Security features removed for simplicity
 */

const adminController = {
  /**
   * @desc    Admin login with hardcoded credentials
   * @route   POST /api/admin/login
   * @access  Public
   */
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Hardcoded admin credentials - matching adminService.js
      const ADMIN_USERNAME = 'admin';
      const ADMIN_PASSWORD = 'admin123';

      // Validate credentials
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Invalid admin credentials' });
      }

      // Simple token generation
      const token = Buffer.from(`${username}:admin`).toString('base64');

      res.json({
        token,
        user: {
          id: 'admin-id',
          username: ADMIN_USERNAME,
          isAdmin: true
        }
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Get admin dashboard data
   * @route   GET /api/admin/dashboard
   * @access  Private/Admin
   */
  getDashboard: async (req, res) => {
    try {
      // Simplified dashboard data - no authentication check
      // This would typically fetch data from MongoDB collections
      res.json({
        stats: {
          users: 0,
          recipes: 0,
          mealPlans: 0,
          supportTickets: 0
        },
        recentActivity: []
      });
    } catch (error) {
      console.error('Get admin dashboard error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = adminController;