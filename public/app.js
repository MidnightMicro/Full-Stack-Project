let form = document.getElementById("foodSearch");
let myProtein = document.getElementById("Protein").value;
// var myCarbs = document.querySelector(".Carbs").value;
let meal_data = document.querySelector("#meal_data");

form.addEventListener("submit", async (event) => {
event.preventDefault();
console.log(myProtein)

const mealDbResponse = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${myProtein}`);
const FoodData = await mealDbResponse.json();
console.log(FoodData);
const image = document.getElementById("mealImage");
const mealName = document.getElementById("mealName");
// const mealInfo = document.getElementById("mealInfo");
// const entireCardSection = document.getElementById("sectionCard");
if (FoodData.meals == null || FoodData.meals.length <= 0) {
    console.log("No Data Here");
    image.setAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxEAb7d9Y-41XsSwlDBOIgl41HgvsUyV9heA&usqp=CAU"
    );
    mealName.innerHTML =
      'Sorry, could not process what meal you are looking for!';
      console.log("wooo")

}
    else if (FoodData.meals.length > 0) {
    let HTMLfragment = "";
    FoodData.meals.forEach((meal) => {
        HTMLfragment += `<section onclick="openTab(${meal.idMeal})" id=${meal.idMeal} class="container">
                            <div class="row">
                                <img class="mealImage" src= ${meal.strMealThumb} />
                                <div class="col">
                                <h1 id="mealName">${meal.strMeal}</h1>
                                  <br>
                                </div>
                            </div>
                        </section>`
    });
   meal_data.innerHTML = HTMLfragment
  }
})
//idMeal/parameter is placeholder

function openTab (idMeal) {
console.log(idMeal);

sessionStorage.setItem("idMeal", idMeal)
window.open("/mealDetails.html", '_blank')
}




// add id to local storage, create new tab 