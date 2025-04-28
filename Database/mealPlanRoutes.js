<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { 
    createMealPlan,
    getMealPlans,
    getMealPlanById,
    updateMealPlan,
    deleteMealPlan
} = require('../controllers/mealPlanController');
const { protect } = require('../middleware/authMiddleware');

// All meal plan routes are protected
router.post('/', protect, createMealPlan);
router.get('/', protect, getMealPlans);
router.get('/:id', protect, getMealPlanById);
router.put('/:id', protect, updateMealPlan);
router.delete('/:id', protect, deleteMealPlan);

=======
const express = require('express');
const router = express.Router();
const { 
    createMealPlan,
    getMealPlans,
    getMealPlanById,
    updateMealPlan,
    deleteMealPlan
} = require('../controllers/mealPlanController');
const { protect } = require('../middleware/authMiddleware');

// All meal plan routes are protected
router.post('/', protect, createMealPlan);
router.get('/', protect, getMealPlans);
router.get('/:id', protect, getMealPlanById);
router.put('/:id', protect, updateMealPlan);
router.delete('/:id', protect, deleteMealPlan);

>>>>>>> 088e4bc57b5299788084a8bd1b5330d0213972cb
module.exports = router; 