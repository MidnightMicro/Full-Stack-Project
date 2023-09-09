const form = document.getElementById("foodSearch");
const meals = document.getElementById("meals");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const main_food = event.target.food.value;
  const mealDbResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${main_food}`
  );
  const FoodData = await mealDbResponse.json();

  console.log(FoodData);

  if (FoodData.meals == null || FoodData.meals.length <= 0) {
    meals.innerHTML = ""; // Clear any existing meal cards

    const html = `
      <div class="card">
        <img class="card-img-top" src="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">No Data Found</h5>
        </div>
      </div>
    `;
    meals.insertAdjacentHTML("beforeend", html);
  } else if (FoodData.meals.length > 0) {
    meals.innerHTML = ""; // Clear any existing meal cards

    FoodData.meals.forEach((datum) => {
      const html = `
        <div class="card">
          <img class="card-img-top" src="${datum.strMealThumb}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${datum.strMeal}</h5>
          </div>
        </div>
      `;

      meals.insertAdjacentHTML("beforeend", html);
    });
  }
});
