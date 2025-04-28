const MealDbService = require('../services/mealDbService');

/**
 * Controller for external recipe API endpoints
 */
const externalRecipeController = {
  /**
   * @desc    Search meals by name
   * @route   GET /api/external/recipes/search
   * @access  Public
   */
  searchMeals: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }
      
      const meals = await MealDbService.searchMealByName(query);
      res.json(meals);
    } catch (error) {
      console.error('Search meals error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Get meals by first letter
   * @route   GET /api/external/recipes/letter/:letter
   * @access  Public
   */
  getMealsByLetter: async (req, res) => {
    try {
      const { letter } = req.params;
      if (!letter || letter.length !== 1) {
        return res.status(400).json({ message: 'Valid single letter is required' });
      }
      
      const meals = await MealDbService.getMealsByFirstLetter(letter);
      res.json(meals);
    } catch (error) {
      console.error('Get meals by letter error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Get meal by ID
   * @route   GET /api/external/recipes/:id
   * @access  Public
   */
  getMealById: async (req, res) => {
    try {
      const { id } = req.params;
      const meal = await MealDbService.getMealById(id);
      
      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' });
      }
      
      res.json(meal);
    } catch (error) {
      console.error('Get meal by ID error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Get random meal
   * @route   GET /api/external/recipes/random
   * @access  Public
   */
  getRandomMeal: async (req, res) => {
    try {
      const meal = await MealDbService.getRandomMeal();
      res.json(meal);
    } catch (error) {
      console.error('Get random meal error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Get all meal categories
   * @route   GET /api/external/categories
   * @access  Public
   */
  getCategories: async (req, res) => {
    try {
      const categories = await MealDbService.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Get list (categories, areas, ingredients)
   * @route   GET /api/external/list/:type
   * @access  Public
   */
  getList: async (req, res) => {
    try {
      const { type } = req.params;
      if (!['c', 'a', 'i'].includes(type)) {
        return res.status(400).json({ message: 'Invalid list type. Use c for categories, a for areas, i for ingredients' });
      }
      
      const list = await MealDbService.getList(type);
      res.json(list);
    } catch (error) {
      console.error('Get list error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Filter meals by ingredient
   * @route   GET /api/external/filter/ingredient/:ingredient
   * @access  Public
   */
  filterByIngredient: async (req, res) => {
    try {
      const { ingredient } = req.params;
      const meals = await MealDbService.filterByIngredient(ingredient);
      res.json(meals);
    } catch (error) {
      console.error('Filter by ingredient error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Filter meals by category
   * @route   GET /api/external/filter/category/:category
   * @access  Public
   */
  filterByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const meals = await MealDbService.filterByCategory(category);
      res.json(meals);
    } catch (error) {
      console.error('Filter by category error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  /**
   * @desc    Filter meals by area
   * @route   GET /api/external/filter/area/:area
   * @access  Public
   */
  filterByArea: async (req, res) => {
    try {
      const { area } = req.params;
      const meals = await MealDbService.filterByArea(area);
      res.json(meals);
    } catch (error) {
      console.error('Filter by area error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = externalRecipeController;