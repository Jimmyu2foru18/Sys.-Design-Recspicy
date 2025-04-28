export class RecipeCard {
    constructor(recipe, onClick) {
        this.recipe = recipe;
        this.onClick = onClick;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.onclick = () => this.onClick(this.recipe._id);

        const imageContainer = document.createElement('div');
        imageContainer.className = 'recipe-card-image';
        const img = document.createElement('img');
        img.src = this.recipe.image || '../LOGO/recipe-placeholder.jpg';
        img.alt = this.recipe.title;
        imageContainer.appendChild(img);

        const content = document.createElement('div');
        content.className = 'recipe-card-content';

        const title = document.createElement('h3');
        title.className = 'recipe-card-title';
        title.textContent = this.recipe.title;

        const meta = document.createElement('div');
        meta.className = 'recipe-card-meta';
        meta.innerHTML = `
            <span><i class="fas fa-clock"></i> ${(this.recipe.prepTime || 0) + (this.recipe.cookTime || 0)} min</span>
            <span><i class="fas fa-utensils"></i> ${this.recipe.difficulty || 'Medium'}</span>
            <span><i class="fas fa-star"></i> ${this.recipe.rating || 0}</span>
        `;

        const tags = document.createElement('div');
        tags.className = 'recipe-card-tags';
        const tagsList = [
            ...(this.recipe.dietaryCategories || []),
            ...(this.recipe.mealTypes || [])
        ].slice(0, 3);
        tags.innerHTML = tagsList.map(tag => `<span class="tag">${tag}</span>`).join('');

        content.appendChild(title);
        content.appendChild(meta);
        content.appendChild(tags);

        card.appendChild(imageContainer);
        card.appendChild(content);

        return card;
    }

    static createGrid(recipes, onClick, container) {
        container.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'recipe-grid';

        recipes.forEach(recipe => {
            const card = new RecipeCard(recipe, onClick);
            grid.appendChild(card.render());
        });

        container.appendChild(grid);
    }
}