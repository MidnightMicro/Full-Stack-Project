const { application } = require("express");

const form = document.getElementById("foodSearch")
var button = document.querySelector("button");
var myProtein = document.querySelector(".Protein");
var myCarbs = document.querySelector(".Carbs");

button.addEventListener("click", () => {
    var obj = {
    Protein:myProtein.value,
    Carbs:myCarbs.value,
};
fetch("/api", {
    method:"POST",
    headers: {
        "Content-type":"application/json"
    },
    body:JSON.stringify(obj)
});
})
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const main_food = event.target.food.value; 

//     const mealDbResponse = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${main_food}`);
//     const FoodData = await mealDbResponse.json();
//     console.log(FoodData); 

//     const image = document.getElementById("mealImage");
//     const mealName = document.getElementById("mealName");
//     const mealNames = FoodData.meals.map((datum) =>
//     { return datum.strMeal }
//     )
//     const mealInfo = document.getElementById("mealInfo");
//     const entireCardSection = document.getElementById("sectionCard");
//     const idMeal = FoodData.meals.map((datum) => { return datum.idMeal });
//     console.log(idMeal);
//     const idMealResponse = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//     const mealIds = await idMealResponse.json();
//     console.log(mealIds)
//     if (FoodData.meals == null || FoodData.meals.length <= 0) {
//         console.log("No Data Here")
//         image.setAttribute(
//           "src",
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxEAb7d9Y-41XsSwlDBOIgl41HgvsUyV9heA&usqp=CAU"
//         );
//         mealName.innerHTML = "";
//         mealInfo.innerHTML = 'Sorry, could not process what meal you are looking for!';
//     } 
//         else if (FoodData.meals.length > 0) {
//         for (let i = 0; i < 5; i++) {
//         console.log("wooo")
//         const MealLinks = document.querySelectorAll(".details");
//         MealLinks.forEach((element, i) => {
//             element.innerHTML = `Check out this link ${FoodData.idMeal}`;
//         })
//         FoodData.meals.map((datum) => {
//           entireCardSection.style.display = "block";
//           image.setAttribute("src", `${datum.strMealThumb}`);
//           mealName.innerHTML = `${datum.strMeal}`;
        
//         });
//       }
//     }
// });