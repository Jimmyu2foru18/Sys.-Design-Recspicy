
class AdminService {
    constructor() {
        this.api = axios.create({
            baseURL: '/api/admin',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.api.interceptors.request.use(config => {
            const token = localStorage.getItem('adminToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    async getDashboardStats() {
        try {
            const response = await this.api.get('/stats');
            return response.data;
        } catch (error) {
            console.error('Error getting dashboard stats:', error);
            throw error;
        }
    }

    async getRecipes(params = {}) {
        try {
            const response = await this.api.get('/recipes', { params });
            return response.data;
        } catch (error) {
            console.error('Error getting recipes:', error);
            throw error;
        }
    }

    async getUsers(params = {}) {
        try {
            const response = await this.api.get('/users', { params });
            return response.data;
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

    async deleteRecipe(id) {
        try {
            await this.api.delete(`/recipes/${id}`);
        } catch (error) {
            console.error('Error deleting recipe:', error);
            throw error;
        }
    }

    async toggleUserStatus(id) {
        try {
            const response = await this.api.post(`/users/${id}/toggle-status`);
            return response.data;
        } catch (error) {
            console.error('Error toggling user status:', error);
            throw error;
        }
    }

    async approveRecipes(ids) {
        try {
            await this.api.post('/recipes/approve', { ids });
        } catch (error) {
            console.error('Error approving recipes:', error);
            throw error;
        }
    }

    async getAnalytics(params = {}) {
        try {
            const response = await this.api.get('/analytics', { params });
            return response.data;
        } catch (error) {
            console.error('Error getting analytics:', error);
            throw error;
        }
    }

    async checkAuth() {
        try {
            const response = await this.api.get('/auth/check');
            return response.data.isAuthenticated;
        } catch (error) {
            console.error('Error checking auth:', error);
            return false;
        }
    }

    async getSupportTickets(params = {}) {
        try {
            const response = await this.api.get('/support/tickets', { params });
            return response.data;
        } catch (error) {
            console.error('Error getting support tickets:', error);
            throw error;
        }
    }

    async getFeedback(params = {}) {
        try {
            const response = await this.api.get('/feedback', { params });
            return response.data;
        } catch (error) {
            console.error('Error getting feedback:', error);
            throw error;
        }
    }

    async updateTicket(id, data) {
        try {
            const response = await this.api.put(`/support/tickets/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating ticket:', error);
            throw error;
        }
    }

    async respondToFeedback(id, response) {
        try {
            await this.api.post(`/feedback/${id}/respond`, { response });
        } catch (error) {
            console.error('Error responding to feedback:', error);
            throw error;
        }
    }

    async sendEmail(data) {
        try {
            const response = await this.api.post('/email/send', data);
            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    async getEmailTemplates() {
        try {
            const response = await this.api.get('/email/templates');
            return response.data;
        } catch (error) {
            console.error('Error getting email templates:', error);
            throw error;
        }
    }
}

const adminService = new AdminService(); 