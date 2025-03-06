async getRandomRecipe() {
    try {
        const response = await this.api.get('/recipes/random');
        return response.data;
    } catch (error) {
        console.error('Error getting random recipe:', error);
        throw error;
    }
}

async getTopRecipes(params) {
    try {
        const response = await this.api.get('/recipes/top', { params });
        return response.data;
    } catch (error) {
        console.error('Error getting top recipes:', error);
        throw error;
    }
}

async createRecipe(formData) {
    try {
        const response = await this.api.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
}

async updateRecipe(recipeId, formData) {
    try {
        const response = await this.api.put(`/${recipeId}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
}

async getRecipe(id) {
    try {
        const response = await this.api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting recipe:', error);
        throw error;
    }
}

async getRecipes(params = {}) {
    try {
        const response = await this.api.get('/', { params });
        return response.data;
    } catch (error) {
        console.error('Error getting recipes:', error);
        throw error;
    }
}

async deleteRecipe(id) {
    try {
        await this.api.delete(`/${id}`);
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
}

async rateRecipe(recipeId, rating) {
    try {
        const response = await this.api.post(`/${recipeId}/rate`, { rating });
        return response.data;
    } catch (error) {
        console.error('Error rating recipe:', error);
        throw error;
    }
}

async toggleFavorite(recipeId) {
    try {
        const response = await this.api.post(`/${recipeId}/favorite`);
        return response.data;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
}

async getFavorites() {
    try {
        const response = await this.api.get('/favorites');
        return response.data;
    } catch (error) {
        console.error('Error getting favorites:', error);
        throw error;
    }
}


async printRecipe(recipeId) {
    try {
        const response = await this.api.get(`/${recipeId}/print`);
        return response.data;
    } catch (error) {
        console.error('Error getting printable recipe:', error);
        throw error;
    }
}

async saveMealPlan(planData) {
    try {
        const response = await this.api.post('/meal-plans', planData);
        return response.data;
    } catch (error) {
        console.error('Error saving meal plan:', error);
        throw error;
    }
}


async getUserMealPlans() {
    try {
        const response = await this.api.get('/meal-plans');
        return response.data;
    } catch (error) {
        console.error('Error getting meal plans:', error);
        throw error;
    }
}

async deleteMealPlan(planId) {
    try {
        await this.api.delete(`/meal-plans/${planId}`);
    } catch (error) {
        console.error('Error deleting meal plan:', error);
        throw error;
    }
}

async searchRecipes(params = {}) {
    try {
        const response = await this.api.get('/search', { params });
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
}

async updateRecipePrivacy(recipeId, isPrivate) {
    try {
        const response = await this.api.put(`/${recipeId}/privacy`, {
            private: isPrivate
        });
        return response.data;
    } catch (error) {
        console.error('Error updating recipe privacy:', error);
        throw error;
    }
}

async getPublicRecipes(params = {}) {
    try {
        const response = await this.api.get('/public', { params });
        return response.data;
    } catch (error) {
        console.error('Error getting public recipes:', error);
        throw error;
    }
}
