const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    name: String,
    amount: String,
    unit: String
  }],
  steps: [{
    step: Number,
    description: String
  }],
  cookTime: {
    type: Number,
    required: true
  },
  prepTime: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    fiber: Number,
    sugar: Number
  },
  mealTypes: [{
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']
  }],
  categories: [String],
  dietaryCategories: [{
    type: String,
    enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb']
  }],
  allergens: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  image: {
    type: String,
    default: '/uploads/recipes/default.jpg'
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add text index for search functionality
RecipeSchema.index({ title: 'text', description: 'text' });

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;