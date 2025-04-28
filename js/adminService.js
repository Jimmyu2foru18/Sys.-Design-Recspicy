/**
 * Service for admin authentication and operations
 * Authors: James McGuigan & Steven Foster
 * - Username: admin
 * - Password: admin123
 * 
 */
const adminService = {
  // Admin credentials (in a real app, this would be server-side)
  adminCredentials: {
    username: 'admin',
    password: 'admin123'
  },
  
  /**
   * Admin login with hardcoded credentials
   * @param {string} username - Admin username
   * @param {string} password - Admin password
   * @returns {Promise<boolean>} - Login success status
   */
  login: async (username, password) => {
    try {
      // Simplified authentication with no delay
      if (username === adminService.adminCredentials.username && 
          password === adminService.adminCredentials.password) {
        // Simple token generation
        const token = btoa(`${username}:admin`);
        const user = { username, isAdmin: true };
        
        // Store in localStorage
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    }
  },

  /**
   * Check if user is logged in as admin
   * @returns {boolean} - True if logged in as admin
   */
  isAdminLoggedIn: () => {
    const token = localStorage.getItem('adminToken');
    const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
    return !!token && user.isAdmin === true;
  },

  /**
   * Logout admin user
   */
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/pages/signin.html';
  },

  /**
   * Get admin dashboard data
   * @returns {Promise<Object>} - Dashboard data
   */
  getDashboard: async () => {
    try {
      // Simplified dashboard data retrieval
      // No token verification for simplicity
      const response = await fetch('/api/admin/dashboard');
      
      if (!response.ok) {
        return {
          stats: {
            users: 0,
            recipes: 0,
            mealPlans: 0,
            supportTickets: 0
          },
          recentActivity: []
        };
      }

      return await response.json();
    } catch (error) {
      console.error('Get admin dashboard error:', error);
      // Return mock data on error
      return {
        stats: {
          users: 0,
          recipes: 0,
          mealPlans: 0,
          supportTickets: 0
        },
        recentActivity: []
      };
    }
  },

  /**
   * Get admin token for API calls
   * @returns {string|null} - Admin token or null if not logged in
   */
  getToken: () => {
    return localStorage.getItem('adminToken');
  }
};