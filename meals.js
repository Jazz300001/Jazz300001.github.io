// HTML 
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plan It - Meal Menu</title>
</head>
<body>
    <header>
        <h1>Plan It</h1>
        <button id="fetchButton">Fetch Random Menu</button>
    </header>
    <main>
        <div id="meals">
            <div id="breakfast">
                <h2>Breakfast</h2>
                <p id="breakfast-description"></p>
                <p id="breakfast-food-groups"></p>
            </div>
            <div id="lunch">
                <h2>Lunch</h2>
                <p id="lunch-description"></p>
                <p id="lunch-food-groups"></p>
            </div>
            <div id="dinner">
                <h2>Dinner</h2>
                <p id="dinner-description"></p>
                <p id="dinner-food-groups"></p>
            </div>
        </div>
    </main>
    <script src="meals.js"></script>
</body>
</html>
*/

document.getElementById("fetchButton").addEventListener("click", fetchRandomMenu);

function fetchRandomMenu() {
    fetch("http://localhost:3000/api/mealsLinks")
        .then(response => response.json())
        .then(data => {
            displayMeals(data);
        })
        .catch(error => console.error("Error fetching the meal data: ", error));
}

function displayMeals(meals) {
    const breakfast = meals.breakfast;
    document.getElementById("breakfast-description").textContent = `${breakfast.name}: ${breakfast.description}`;
    document.getElementById("breakfast-food-groups").textContent = `Food groups: ${breakfast["food-groups"].join(", ")}`;

    const lunch = meals.lunch;
    document.getElementById("lunch-description").textContent = `${lunch.name}: ${lunch.description}`;
    document.getElementById("lunch-food-groups").textContent = `Food groups: ${lunch["food-groups"].join(", ")}`;

    const dinner = meals.dinner;
    document.getElementById("dinner-description").textContent = `${dinner.name}: ${dinner.description}`;
    document.getElementById("dinner-food-groups").textContent = `Food groups: ${dinner["food-groups"].join(", ")}`;
}
