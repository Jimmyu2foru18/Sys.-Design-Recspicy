const express = require('express');
const router = express.Router();
const externalRecipeController = require('../controllers/externalRecipeController');

// Public routes for TheMealDB API integration
router.get('/search', externalRecipeController.searchMeals);
router.get('/letter/:letter', externalRecipeController.getMealsByLetter);
router.get('/random', externalRecipeController.getRandomMeal);
router.get('/:id', externalRecipeController.getMealById);

// Categories and lists
router.get('/categories', externalRecipeController.getCategories);
router.get('/list/:type', externalRecipeController.getList);

// Filter routes
router.get('/filter/ingredient/:ingredient', externalRecipeController.filterByIngredient);
router.get('/filter/category/:category', externalRecipeController.filterByCategory);
router.get('/filter/area/:area', externalRecipeController.filterByArea);

module.exports = router;