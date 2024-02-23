// this is the recipe logic for the client side to handle the recipe page

// -= All event listeners =-

// Favorites (Heart button)
const heartButtons = document.querySelectorAll(".heart-button"); // Get all heart buttons

// Attach event listener to each heart button
heartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const recipeId = this.getAttribute("data-recipe-id");
    console.log("recipeId", recipeId);
    toggleFavorite(recipeId);
  });
});

// Event Listener for Navbar (meal types)

// Event Listener for Navbar (cuisines)

// Attach event listener to a recipe card
/*
heartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const recipeId = this.getAttribute("data-recipe-id");
    console.log("recipeId", recipeId);
    toggleFavorite(recipeId);
  });
});
*/

// all the front-end functions listed below:
// function to filter the recipes by a specific cuisine
async function filterByParam(param) {
  console.log("search for recipe via param ", param);
  try {
    console.log("request url:", `/recipe/${param}`);
    const data = await $.ajax({
      url: `/recipe/${param}`,
      type: "GET",
    });
    //console.log(data);
    // Redirect to the recipe page
    window.location.href = `/recipe/${param}`;
    // Example: displayRecipes(data);
  } catch (error) {
    // Handle any errors that occurred during the AJAX request.
    console.log("request error url:", `/recipe/${param}`);
    console.error(error);
  }
}

async function recipeClick(recipeId) {
  console.log("recipe clicked for recipe", recipeId);
  try {
    console.log("request url:", `/recipe/details/${recipeId}`);
    const data = await $.ajax({
      url: `/recipe/details/${recipeId}`,
      type: "GET",
    });
    // Redirect to the recipe page
    window.location.href = `/recipe/details/${recipeId}`;
    //isplayRecipeDetails(data); // Pass the data to the display function
    // Example: displayRecipes(data);
  } catch (error) {
    // Handle any errors that occurred during the AJAX request.
    console.log("request error url:", `/recipe/details/${recipeId}`);
    console.error(error);
  }
}

// Function to toggle favorite
async function toggleFavorite(recipeId) {
  console.log("checking favorite");

  const button = document.querySelector(
    `.heart-button[data-recipe-id="${recipeId}"]`
  );
  const icon = button.querySelector(".heart-icon");
  const isFavorite = icon.classList.contains("fas");
  const userId = 3; //temporary hardcoded userid
  if (isFavorite) {
    // Remove from favorites
    console.log("removing favorite");
    removeFromFavorites(userId, recipeId);
    icon.classList.remove("fas");
    icon.classList.add("far");
    icon.style.color = ""; // Reset color to default
  } else {
    // Add to favorites
    console.log("adding favorite");
    addToFavorites(userId, recipeId);
    icon.classList.remove("far");
    icon.classList.add("fas");
    icon.style.color = "red";
  }
}

// Function to add to favorites
async function addToFavorites(userId, recipeId) {
  userId = 3; // temp override user id
  try {
    await fetch(`/favorites/${userId}/${recipeId}`, {
      method: "POST",
    });
    console.log("Added recipe with ID:", recipeId, "to favorites");
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
  }
}

// Function to remove favorites
async function removeFromFavorites(userId, recipeId) {
  userId = 3; // temp override user id
  try {
    await fetch(`/favorites/${userId}/${recipeId}`, {
      method: "DELETE",
    });
    console.log("Removed recipe with ID:", recipeId, "from favorites");
  } catch (error) {
    console.error("Error removing recipe from favorites:", error);
  }
}