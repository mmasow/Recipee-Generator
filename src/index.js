document
  .querySelector("#recipe-generator-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let userInput = document.querySelector(".instructions").value.trim();
    if (!userInput) {
      alert("Please enter a dish or ingredient!");
      return;
    }

    let apiKey = "7ed3b7cd7f065ff030t5ab6d86o72477";
    let recipeElement = document.getElementById("recipe");

    // ✅ Improved prompt for structured recipe
    let prompt = `Create a well-structured recipe for ${userInput}.
    Format it as follows:
    - **Dish Name**: [Title]

    - **Ingredients**:
      . Ingredient 1
      . Ingredient 2

    - **Instructions**:
      1. Step 1
      2. Step 2
      3. Step 3`;

    let context = `Keep it under 120 words. 
    Use captitals formatting for titles and dont bold the content.
    Write in a friendly, clear, and well structured manner.`;

    // ✅ Typewriter effect while waiting for API response
    recipeElement.innerHTML = "";
    let typewriter = new Typewriter(recipeElement, {
      strings: ["Loading your recipe...🍽️"],
      autoStart: true,
      delay: 50,
      cursor: "|",
    });

    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    try {
      let response = await fetch(apiUrl);
      let data = await response.json();

      // ✅ Convert markdown response to HTML for better formatting
      let formattedRecipe = data.answer
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
        .replace(/\n/g, "<br>") // Convert new lines to <br> for better display
        .replace(/- (.*?)<br>/g, "<li>$1</li>"); // Convert "- item" into <li> items

      // ✅ Apply Typewriter effect to AI-generated response
      typewriter.deleteAll().typeString(formattedRecipe).start();
    } catch (error) {
      recipeElement.innerHTML = "❌ Oops! Something went wrong.";
      console.error("Error fetching recipe:", error);
    }
  });
