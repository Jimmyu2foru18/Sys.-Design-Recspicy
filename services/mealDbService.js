const axios = require('axios');

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Service to interact with TheMealDB API
 */
class MealDbService {
  /**
   * Search meal by name
   * @param {string} name - Meal name to search for
   * @returns {Promise<Array>} - Array of meals
   */
  static async searchMealByName(name) {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error searching meal by name:', error.message);
      throw new Error('Failed to search meal by name');
    }
  }

  /**
   * List all meals by first letter
   * @param {string} letter - First letter to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  static async getMealsByFirstLetter(letter) {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error getting meals by first letter:', error.message);
      throw new Error('Failed to get meals by first letter');
    }
  }

  /**
   * Lookup full meal details by id
   * @param {string} id - Meal ID
   * @returns {Promise<Object>} - Meal details
   */
  static async getMealById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error getting meal by ID:', error.message);
      throw new Error('Failed to get meal by ID');
    }
  }

  /**
   * Get a random meal
   * @returns {Promise<Object>} - Random meal
   */
  static async getRandomMeal() {
    try {
      const response = await axios.get(`${BASE_URL}/random.php`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error getting random meal:', error.message);
      throw new Error('Failed to get random meal');
    }
  }

  /**
   * Get all meal categories
   * @returns {Promise<Array>} - Array of categories
   */
  static async getCategories() {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error('Error getting categories:', error.message);
      throw new Error('Failed to get categories');
    }
  }

  /**
   * Get list of all categories, areas, or ingredients
   * @param {string} type - Type of list (c=category, a=area, i=ingredient)
   * @returns {Promise<Array>} - Array of items
   */
  static async getList(type) {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?${type}=list`);
      return response.data.meals || [];
    } catch (error) {
      console.error(`Error getting ${type} list:`, error.message);
      throw new Error(`Failed to get ${type} list`);
    }
  }

  /**
   * Filter meals by main ingredient
   * @param {string} ingredient - Ingredient to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  static async filterByIngredient(ingredient) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error filtering by ingredient:', error.message);
      throw new Error('Failed to filter by ingredient');
    }
  }

  /**
   * Filter meals by category
   * @param {string} category - Category to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  static async filterByCategory(category) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error filtering by category:', error.message);
      throw new Error('Failed to filter by category');
    }
  }

  /**
   * Filter meals by area
   * @param {string} area - Area to filter by
   * @returns {Promise<Array>} - Array of meals
   */
  static async filterByArea(area) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error filtering by area:', error.message);
      throw new Error('Failed to filter by area');
    }
  }

  /**
   * Get ingredient image URL
   * @param {string} ingredient - Ingredient name
   * @param {string} size - Image size (small, medium, large)
   * @returns {string} - Image URL
   */
  static getIngredientImageUrl(ingredient, size = '') {
    const formattedIngredient = ingredient.replace(/ /g, '_');
    const sizeParam = size ? `-${size}` : '';
    return `https://www.themealdb.com/images/ingredients/${formattedIngredient}${sizeParam}.png`;
  }
}

module.exports = MealDbService;