import { cocktails } from "./cocktails.js";

const grid = document.getElementById("cocktail-grid");

function renderCocktails() {
  grid.innerHTML = cocktails
    .map(
      (cocktail) => `
        <article class="cocktail-card">
          <header>
            <div>
              <p class="eyebrow">${cocktail.spirit}</p>
              <h3>${cocktail.name}</h3>
              <p class="story">${cocktail.story}</p>
            </div>
            <span class="mini-stat">${cocktail.time}</span>
          </header>

          <div>
            <p class="card-section-title">Ingredienser</p>
            <div class="card-tags" aria-label="Ingredienser">
              ${cocktail.ingredients.map((ingredient) => `<span>${ingredient}</span>`).join("")}
            </div>
          </div>

          <div>
            <p class="card-section-title">Slik lager jeg den</p>
            <ol class="card-list">
              ${cocktail.method.map((step) => `<li>${step}</li>`).join("")}
            </ol>
          </div>

          <div class="card-footer">
            <span>${cocktail.glass}</span>
            <span>${cocktail.category.join(" · ")}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

renderCocktails();
