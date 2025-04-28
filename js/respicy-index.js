const MealDbService = {
    async getRandomMeal() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error('Error getting random meal:', error);
            throw new Error('Failed to get random meal');
        }
    },

    async filterByCategory(category) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error filtering by category:', error);
            throw new Error('Failed to filter by category');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadAllRecipes();
    initializeFilters();
});

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterRecipes(filter);
        });
    });
}

async function loadAllRecipes() {
    try {
        // Load trending recipes (random meals)
        const trendingMeals = [];
        for (let i = 0; i < 8; i++) {
            const meal = await MealDbService.getRandomMeal();
            if (meal) trendingMeals.push(meal);
        }
        displayRecipes('trending-recipes', trendingMeals);

        // Load featured recipes (Seafood category)
        const featuredMeals = await MealDbService.filterByCategory('Seafood');
        displayRecipes('featured-recipes', featuredMeals.slice(0, 8));

        // Load recommended recipes (Dessert category)
        const recommendedMeals = await MealDbService.filterByCategory('Dessert');
        displayRecipes('recommended-recipes', recommendedMeals.slice(0, 8));

    } catch (error) {
        console.error('Error loading recipes:', error);
        showError('all-sections');
    }
}

function displayRecipes(containerId, meals) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="window.location.href='recipe-details.html?id=${meal.idMeal}'">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
            <div class="recipe-info">
                <h3 class="recipe-title">${meal.strMeal}</h3>
                <div class="recipe-metadata">
                    <span class="recipe-category">${meal.strCategory || 'Various'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterRecipes(filter) {
    // Show/hide recipes based on filter
    const allContainers = ['trending-recipes', 'featured-recipes', 'recommended-recipes'];
    
    allContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (filter === 'all' || containerId.includes(filter)) {
            container.parentElement.style.display = 'block';
        } else {
            container.parentElement.style.display = 'none';
        }
    });
}

function showError(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <p>Failed to load recipes. Please try again later.</p>
            </div>
        `;
    }
}
