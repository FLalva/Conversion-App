// Fatima Lalva Final Assignment
// facade.js
//
// Revision History:
//     Fatima Lalva, April 10, 2020: Created

function addRecipe(){
    if (validate_frmAddRecipe()){
        var options = [];

        var recipeName = $("#txtRecipeName").val();
        var yield = $("#txtYield").val();
        var description = $("#txtDescription").val();
        var ingredientsNeeded = $("#txtIngredientsNeeded").val();
        var directions = $("#txtDirections").val();

        options = [recipeName, yield, description, ingredientsNeeded, directions];

        function callback() {
            $("#popupRecipeAdded").popup("open");
        }
        recipe.insert(options, callback);
    }
}

function updateRecipe() {
    if (validate_frmUpdateRecipe()){
        var options = [];

        var recipeId = localStorage.getItem("recipeId");

        var recipeName = $("#txtEditRecipeName").val();
        var yield = $("#txtEditYield").val();
        var description = $("#txtEditDescription").val();
        var ingredientsNeeded = $("#txtEditIngredientsNeeded").val();
        var directions = $("#txtEditDirections").val();

        options = [recipeName, yield, description, ingredientsNeeded, directions, recipeId];

        function callback() {
            console.info("Edited!");
        }

        recipe.update(options, callback);
        $(location).prop('href','#pageViewARecipe');
        showARecipe();
    }
}

function showARecipe() {
    var recipeId = localStorage.getItem("recipeId");

    var options = [recipeId];

    function callback(tx, results){
        var row = results.rows.item(0);

        //show on page with no text boxes, make it look pretty
        var recipeName = row['recipe_name'];
        var yield = row['yield'];
        var description = row['description'];
        var ingredients = row['ingredient_list'];
        var directions = row['directions'];

        var divRecipeName = document.getElementById("divRecipeName");
        var divYield = document.getElementById("divYield");
        var divDescription = document.getElementById("divDescription");
        var divIngredients = document.getElementById("divIngredients");
        var divDirections = document.getElementById("divDirections");

        divRecipeName.innerHTML = recipeName;
        divYield.innerHTML = "<strong>Yield: </strong>" + yield;
        divDescription.innerHTML = "<i>" + description + "</i>";

        var line = ingredients.split('\n');
        divIngredients.innerHTML = "";
        divIngredients.innerHTML += "<h4 class='paddingBottom'>Ingredients:</h4>";
        for (var i = 0; i < line.length; i++){
            divIngredients.innerHTML += "<p class='spaceBottom'>" + line[i] + "</p>";
        }

        var directionLine = directions.split('\n');
        divDirections.innerHTML = "";
        divDirections.innerHTML += "<h4 class='paddingBottom'>Directions:</h4>";
        for (var j = 0; j < directionLine.length; j++){
            divDirections.innerHTML += "<p class='spaceBottom'>" + directionLine[j] + "</p>";
        }

        $("#btnEditRecipe").on("click", clickHandler);
        function clickHandler() {
            $(location).prop("href", "#pageEditRecipe");
            showARecipeToEdit();
        }

    }
    recipe.select(options, callback);
}

function showARecipeToEdit() {
    var recipeId = localStorage.getItem("recipeId");

    var options = [recipeId];

    function callback(tx, results){
        var row = results.rows.item(0);

        $("#txtEditRecipeName").val(row['recipe_name']);
        $("#txtEditYield").val(row['yield']);
        $("#txtEditDescription").val(row['description']);
        $("#txtEditIngredientsNeeded").val(row['ingredient_list']);
        $("#txtEditDirections").val(row['directions']);
    }
    recipe.select(options, callback);
}

function deleteRecipe(){
    var recipeId = localStorage.getItem("recipeId");

    var options = [recipeId];

    function callback() {
        console.log("Deleted!")
    }

    recipe.delete(options, callback);
    $(location).prop("href", "#pageViewRecipes");

}

function showAllRecipes(){
    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlCode += "<li><a href='#' data-role='button' data-row-id='" + row['recipe_id'] + "'>" +
                "<p class=\"font\">" + row['recipe_name'] + "</p>" +
                "<p class=\"font\"><strong>Yield:</strong> " + row['yield'] + "</p>" +
                "<p class=\"font\"><i>" + row['description'] + "</i></p>" +
                "</a></li>";
        }

        var listView = $("#recipeList");
        listView = listView.html(htmlCode);
        listView.listview("refresh");

        $("#recipeList a").on("click", clickHandler);
        function clickHandler() {
            var id = $(this).attr("data-row-id");
            localStorage.setItem("recipeId", id);
            $(location).prop("href", "#pageViewARecipe");
        }
    }
    recipe.selectAll(options, callback);
}

function clearRecipes() {
    var options = [];

    function callback() {
        console.log("Recipe Table deleted");
    }
    recipe.deleteAll(options, callback);

    $(location).prop('href','#pageAddRecipe');
}

function calculate(){
    var selectedIngredient = $("#comboIngredient :selected").text();
    var amount = $("#txtAmount").val();
    var selectedUnit = $("#comboUnit :selected").text();

    var options = [selectedIngredient.toUpperCase()];

    function callback(tx, results){
        var row = results.rows.item(0);

        var grams = row['grams'];
        var result;

        if(selectedUnit === "grams"){
            //convert to cup
            result = (parseFloat(amount) / grams).toFixed(2);
            if (result <= 1){
                result = result + " cup";
            }
            else {
                result = result + " cups";
            }
        }
        else if (selectedUnit === "cups"){
            //convert to grams
            result = (parseFloat(amount) * grams).toFixed(2);
            if (result <= 1){
                result = result + " gram";
            }
            else {
                result = result + " grams";
            }
        }
        $("#divResult").show();

        var divResult = document.getElementById("divResult");
        divResult.innerHTML = result;
    }
    ingredient.find(options, callback);
}

function updateIngredientDropdown(){
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlCode += "<option value="+ row['ingredient_name'] +">" + row['ingredient_name'] + "</option>";
        }

        var selectHtml = $("#comboIngredient");

        selectHtml = selectHtml.html(htmlCode);
        $("#comboIngredient").selectmenu("refresh");
    }
    ingredient.selectAll(options, callback);
}

function updateUnitDropdown() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlCode += "<option value='"+ row['unit_name'] +"'>" + row['unit_name'] + "</option>";
        }

        var selectHtml = $("#comboUnit");

        selectHtml = selectHtml.html(htmlCode);
        $("#comboUnit").selectmenu("refresh");
    }
    unit.selectAll(options, callback);
}

function addIngredient(){
    if (validate_frmAdd()){
        var options = [];

        var ingredientInput = $("#txtIngredient").val();
        var weight = $("#txtWeight").val();

        options = [ingredientInput, weight, 1];

        function callback() {
            $("#popupAdd").popup("open");
        }
        ingredient.insert(options, callback);
    }
}

function editIngredient(){
    if (validate_frmEdit()){
        var options = [];

        var id = localStorage.getItem("ingredientId");

        var ingredientInput = $("#txtIngredientEdit").val();
        var weight = $("#txtWeightEdit").val();

        options = [ingredientInput, weight, 1, id];

        function callback() {
            console.info("Edited!");
        }

        ingredient.update(options, callback);
        $(location).prop('href','#pageView');
    }
}

function deleteIngredient(){
    var id = localStorage.getItem("ingredientId");

    var options = [id];

    function callback() {
        console.log("Deleted!")
    }

    ingredient.delete(options, callback);
    $(location).prop('href','#pageView');
}

function showIngredient() {
    var id = localStorage.getItem("ingredientId");

    var options = [id];

    function callback(tx, results){
        var row = results.rows.item(0);

        $("#txtIngredientEdit").val(row['ingredient_name']);
        $("#txtWeightEdit").val(row['grams']);
    }
    ingredient.select(options, callback);
}

function showAllIngredients(){
    var options = [];

    function callback(tx, results){
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlCode += "<li><a href='#' data-role='button' data-row-id='" + row['ingredient_id'] + "'>" +
                "<p class=\"font\"><strong>Ingredient:</strong> " + row['ingredient_name'] + "</p>" +
                "<p class=\"font\"><strong>Grams:</strong> " + row['grams'] + "</p>" +
                "<p class=\"font\"><strong>Cup:</strong> " + row['cups'] + "</p>" +
                "</a></li>";
        }

        var listView = $("#ingredientList");
        listView = listView.html(htmlCode);
        listView.listview("refresh");

        $("#ingredientList a").on("click", clickHandler);
        function clickHandler() {
            var id = $(this).attr("data-row-id");
            localStorage.setItem("ingredientId", id);
            $(location).prop("href", "#pageEdit");
        }
    }
    ingredient.selectAll(options, callback);
}

function clearIngredients() {
    var options = [];

    function callback() {
        console.log("Ingredients Table deleted");
    }
    ingredient.deleteAll(options, callback);

    $(location).prop('href','#pageAdd');
}