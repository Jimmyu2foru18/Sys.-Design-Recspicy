/**
 * Service for interacting with external recipe APIs (TheMealDB)
 */
const externalRecipeService = {
  /**
   * Search meals by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of meals
   */
  searchMeals: async (query) => {
    try {
      const response = await fetch(`/api/external/recipes/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search meals');
      return await response.json();
    } catch (error) {
      console.error('Error searching meals:', error);
      throw error;
    }
  },

  /**
   * Get meals by first letter
   * @param {string} letter - First letter
   * @returns {Promise<Array>} - Array of meals
   */
  getMealsByLetter: async (letter) => {
    try {
      const response = await fetch(`/api/external/recipes/letter/${letter}`);
      if (!response.ok) throw new Error('Failed to get meals by letter');
      return await response.json();
    } catch (error) {
      console.error('Error getting meals by letter:', error);
      throw error;
    }
  },

  /**
   * Get meal by ID
   * @param {string} id - Meal ID
   * @returns {Promise<Object>} - Meal details
   */
  getMealById: async (id) => {
    try {
      const response = await fetch(`/api/external/recipes/${id}`);
      if (!response.ok) throw new Error('Failed to get meal');
      return await response.json();
    } catch (error) {
      console.error('Error getting meal by ID:', error);
      throw error;
    }
  },

  /**
   * Get random meal
   * @returns {Promise<Object>} - Random meal
   */
  getRandomMeal: async () => {
    try {
      const response = await fetch('/api/external/recipes/random');
      if (!response.ok) throw new Error('Failed to get random meal');
      return await response.json();
    } catch (error) {
      console.error('Error getting random meal:', error);
      throw error;
    }
  },

  /**
   * Get all meal categories
   * @returns {Promise<Array>} - Array of categories
   */
  getCategories: async () => {
    try {
      const response = await fetch('/api/external/recipes/categories');
      if (!response.ok) throw new Error('Failed to get categories');
      return await response.json();
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  /**
   * Get list (categories, areas, ingredients)
   * @param {string} type - Type of list (c=category, a=area, i=ingredient)
   * @returns {Promise<Array>} - Array of items
   */
  getList: async (type) => {
    try {
      const response = await fetch(`/api/external/recipes/list/${type}`);
      if (!response.ok) throw new Error(`Failed to get ${type} list`);
      return await response.json();
    } catch (error) {
      console.error(`Error getting ${type} list:`, error);
      throw error;
    }
  },

  /**
   * Filter meals by ingredient
   * @param {string} ingredient - Ingredient to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  filterByIngredient: async (ingredient) => {
    try {
      const response = await fetch(`/api/external/recipes/filter/ingredient/${encodeURIComponent(ingredient)}`);
      if (!response.ok) throw new Error('Failed to filter by ingredient');
      return await response.json();
    } catch (error) {
      console.error('Error filtering by ingredient:', error);
      throw error;
    }
  },

  /**
   * Filter meals by category
   * @param {string} category - Category to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  filterByCategory: async (category) => {
    try {
      const response = await fetch(`/api/external/recipes/filter/category/${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error('Failed to filter by category');
      return await response.json();
    } catch (error) {
      console.error('Error filtering by category:', error);
      throw error;
    }
  },

  /**
   * Filter meals by area
   * @param {string} area - Area to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  filterByArea: async (area) => {
    try {
      const response = await fetch(`/api/external/recipes/filter/area/${encodeURIComponent(area)}`);
      if (!response.ok) throw new Error('Failed to filter by area');
      return await response.json();
    } catch (error) {
      console.error('Error filtering by area:', error);
      throw error;
    }
  },

  /**
   * Get ingredient image URL
   * @param {string} ingredient - Ingredient name
   * @param {string} size - Image size (small, medium, large)
   * @returns {string} - Image URL
   */
  getIngredientImageUrl: (ingredient, size = '') => {
    const formattedIngredient = ingredient.replace(/ /g, '_');
    const sizeParam = size ? `-${size}` : '';
    return `https://www.themealdb.com/images/ingredients/${formattedIngredient}${sizeParam}.png`;
  }
};