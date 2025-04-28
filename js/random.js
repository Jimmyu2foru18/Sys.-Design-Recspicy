// Import the external recipe service
import { externalRecipeService } from './externalRecipeService.js';

document.addEventListener('DOMContentLoaded', () => 
{
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const shareBtn = document.getElementById('share-btn');
    const printBtn = document.getElementById('print-btn');


    generateRandomRecipe();
    setupEventListeners();

    generateBtn.addEventListener('click', generateRandomRecipe);
    saveBtn.addEventListener('click', saveRecipe);
	
    shareBtn.addEventListener('click', shareRecipe);
    printBtn.addEventListener('click', () => navigateToPrintPage(currentRecipe.id));
});



async function generateRandomRecipe() 
{
    const container = document.querySelector('.recipe-container');
    container.classList.add('loading');

    try 
	{
        // Get a random recipe from TheMealDB API
        const meal = await externalRecipeService.getRandomMeal();
        
        if (!meal) {
            showError('Failed to get a random recipe. Please try again.');
            return;
        }
        
        // Convert TheMealDB format to our app format
        const recipe = convertMealToRecipe(meal);
        currentRecipe = recipe;
        
        updateRecipeUI(recipe);
        // No need to check user interactions for external recipes
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
	catch (error) 
	{
        console.error('Error generating recipe:', error);
        showError('Failed to generate recipe');
    } 
	finally 
	{
        container.classList.remove('loading');
    }
}



/**
 * Convert TheMealDB meal format to our app's recipe format
 */
function convertMealToRecipe(meal) {
    // Extract ingredients and measures
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
        }
    }
    
    // Split instructions into steps
    const instructions = meal.strInstructions
        .split('.')
        .filter(step => step.trim() !== '')
        .map(step => step.trim() + '.');
    
    // Create a recipe object in our app's format
    return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        description: `A delicious ${meal.strArea} ${meal.strCategory.toLowerCase()} dish.`,
        cookTime: '30-45', // Estimated
        servings: 4, // Estimated
        difficulty: 'Medium', // Estimated
        ingredients: ingredients,
        instructions: instructions,
        notes: meal.strTags ? `Tags: ${meal.strTags}` : '',
        nutrition: { calories: 'N/A', protein: 'N/A', carbs: 'N/A', fat: 'N/A' },
        tags: [meal.strCategory, meal.strArea],
        stars: 0, // External recipes don't have stars
        source: meal.strSource || 'TheMealDB'
    };
}

function updateRecipeUI(recipe) 
{
    document.getElementById('recipe-image').src = recipe.image;
    document.getElementById('recipe-image').alt = recipe.title;
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('cook-time').textContent = `${recipe.cookTime} mins`;
    document.getElementById('servings').textContent = `${recipe.servings} servings`;
    document.getElementById('difficulty').textContent = recipe.difficulty;
    document.getElementById('recipe-description').textContent = recipe.description;
    document.getElementById('star-count').textContent = recipe.stars;


    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = recipe.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');


    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = recipe.instructions.map(instruction => 
        `<li>${instruction}</li>`
    ).join('');


    document.getElementById('recipe-notes').textContent = recipe.notes || 'No additional notes.';


    const nutritionFacts = document.getElementById('nutrition-facts');
    nutritionFacts.innerHTML = Object.entries(recipe.nutrition).map(([key, value]) => `
        <div class="nutrition-item">
            <span class="nutrition-label">${key}</span>
            <span class="nutrition-value">${value}${key === 'calories' ? '' : 'g'}</span>
        </div>
    `).join('');


    const tagsContainer = document.getElementById('recipe-tags');
    tagsContainer.innerHTML = recipe.tags.map(tag => 
        `<span class="recipe-tag">${tag}</span>`
    ).join('');


    document.title = `${recipe.title} - Random Recipe - Recspicy`;
}

function saveRecipe() 
{
    const userToken = localStorage.getItem('userToken');
    if (!userToken) 
	{
        alert('Please sign in to save recipes');
        return;
    }
    alert('Recipe saved to your favorites!');
}

function shareRecipe() 
{
    if (navigator.share) 
	{
        navigator.share(
		{
            title: document.getElementById('recipe-title').textContent,
            text: 'Check out this recipe I found on Recspicy!',
            url: window.location.href
        }).catch(console.error);
    } 
	else 
	{
        const recipeUrl = window.location.href;
        navigator.clipboard.writeText(recipeUrl)
            .then(() => alert('Recipe link copied to clipboard!'))
            .catch(console.error);
    }
}



function navigateToPrintPage(recipeId) 
{
    window.location.href = `print-recipe.html?id=${recipeId}`;
}



function showError(message) 
{
    const recipeSection = document.getElementById('recipe-section');
    recipeSection.innerHTML = `
        <div class="error-message">
            ${message}
        </div>
    `;
}


let currentRecipe = null;



function setupEventListeners() 
{
    document.getElementById('generate-btn').addEventListener('click', generateRandomRecipe);
    
    const starBtn = document.getElementById('star-btn');
    const favoriteBtn = document.getElementById('favorite-btn');
    const printBtn = document.getElementById('print-btn');

    starBtn.addEventListener('click', () => toggleStar(currentRecipe.id));
    favoriteBtn.addEventListener('click', () => toggleFavorite(currentRecipe.id));
    printBtn.addEventListener('click', () => navigateToPrintPage(currentRecipe.id));
}