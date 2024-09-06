const searchMeal=document.getElementById("input");
const searchBtn=document.getElementById("search");
const mealList=document.querySelector(".meal-wrapper");
const nomeal=document.getElementById("nomeal");
const popup=document.getElementById("popup");


async function fetchMeal() {
    if (searchMeal.value) {
        
        try {
            const res = await fetch (`https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`);

            const resData = await res.json();
            const fetchMeal=resData.meals;
            nomeal.style.display = "none";
            mealList.innerHTML = "";
            displayMeal(fetchMeal);
        } catch (error) {
            alert("Something went wrong . Please try again later.");
        }
    } else {
        alert("Search for a food first!");
        nomeal.style.display = "block";
    }
}


function displayMeal(meals){
 console.log(meals);
 meals.forEach(meal => {
   mealList.innerHTML +=`
         <div class="meal-box border border-gray-500 rounded-xl">
                <img src=${meal.strMealThumb
                }
                alt=${meal.strMeal} class="rounded-xl">

                <div class="p-3">
                <h3 class="heading text-2xl text-white">${meal.strMeal}
                    </h3>
                <p class="text-gray-300 my-2">${meal.strInstructions.slice(0,100)}...</p>
               <p class="italic text-gray-500"><span>${meal.strArea}</span> <span>${meal.strCategory}</span></p>
               <div class="mt-4 flex gap-4">
                <a href=${meal.strYoutube } target="_blank" class="btn">Watch</a>
                <button class="text-white" onclick="lookUpDetails('${meal.idMeal}')">View Recipe</button>
               </div>
               
                </div>

            </div>
   `
    
 });


}


async function lookUpDetails(id) {
    try {
        const response=await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = await response.json();
        const lookUpDetails=resData.meals[0];
        showDetails(lookUpDetails);
       
    } catch (error) {
        console.error("An error occurred:", error);
    }
}



function showDetails(meal){
console.log(meal);
popup.classList.add("visible");
popup.classList.remove("invisible");
popup.innerHTML=`
  <div class="bg-white rounded-lg shadow-lg p-6 min-h-[500px] w-[70%]">
                <h2 class="text-xl font-semibold mb-4">${meal.strMeal}</h2>
                <p class="mb-4">${meal.strInstructions}</p>
                <a href=${meal.strYoutube} 
                 class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                   Watch
                </a>
                <button onclick="closeDetails()">Close</button>
            </div>
`;
}

function closeDetails(){
popup.classList.add("invisible");
popup.classList.remove("visible");
}

searchBtn.addEventListener("click",()=>{
    fetchMeal();
    searchMeal.value="";
});

