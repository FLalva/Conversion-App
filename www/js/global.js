// Fatima Lalva Final Assignment
// global.js
//
// Revision History:
//     Fatima Lalva, April 10, 2020: Created

function btnCalculate_click() {
    if (validate_frmCalculate()){
        calculate();
    }
}

function btnClear_click() {
    $("#txtAmount").val(null);
}

function btnSubmitAdd_click() {
    addIngredient();
}

function btnCloseAdd_click() {
    $("#popupAdd").popup("close");
}

function btnUpdate_click() {
    editIngredient();
}

function btnDelete_click() {
    deleteIngredient();
}

function btnConvert_click() {
    if (validate_frmConvert()){
        $("#divConvertedIngredients").show();

        var divCalculated = document.getElementById("divConvertedIngredients");
        divCalculated.innerHTML = "";

        var original = $("#txtServings").val();
        var desired = $("#txtDesiredServing").val();

        var multiplyBy =  parseFloat(desired) / parseFloat(original);

        var line = $("#txtIngredientList").val().split('\n');

        for (var i = 0; i < line.length; i++){
            //first check if line contains digits
            if (line[i].match(/\d/)) {

                //get first part of the string before the space
                var beforeWhiteSpace = line[i].substr(0, line[i].indexOf(' '));
                //get string after space
                var afterWhiteSpace = line[i].substr(line[i].indexOf(' ') + 1);

                //check if before white space has letters in it, or only numbers
                if (beforeWhiteSpace.match(/[a-z]/i)) {
                    var digits = beforeWhiteSpace.replace(/[^\d\.]+/, "");
                    var newDigit = (parseFloat(digits) * multiplyBy).toFixed(2);

                    var nonDigits = beforeWhiteSpace.replace(/[^a-z]/gi, "");

                    divCalculated.innerHTML += "<p>" + newDigit + " " + nonDigits + " " + afterWhiteSpace + "</p>";
                } else {
                    var newDigit = (parseFloat(beforeWhiteSpace) * multiplyBy).toFixed(2);

                    divCalculated.innerHTML += "<p>" + newDigit + " " + afterWhiteSpace + "</p>";
                }
            }
            else {
                divCalculated.innerHTML += "<p>" + line[i] + "</p>";
            }
        }
    }
}

function pageView_show() {
    showAllIngredients();
}

function pageEdit_show() {
    showIngredient();
}

function pageCalculator_show() {
    updateIngredientDropdown();
    updateUnitDropdown();
    $("#divResult").hide();
}

function btnDeleteAllIngredients_click() {
    $("#popupDeleteIngredientsConfirmation").popup("open");
}

function btnDeleteCancel_click() {
    $("#popupDeleteIngredientsConfirmation").popup("close");
}

function btnDeleteYes_click() {
    $("#popupDeleteIngredientsConfirmation").popup("close");
    clearIngredients();
}

function btnDeleteAllRecipes_click() {
    $("#popupDeleteRecipesConfirmation").popup("open");
}

function btnRecipeCancel_click() {
    $("#popupDeleteRecipesConfirmation").popup("close");
}

function btnRecipeYes_click() {
    $("#popupDeleteRecipesConfirmation").popup("close");
    clearRecipes();
}

function pageConversion_show() {
    $("#divConvertedIngredients").hide();
}

function btnAddRecipe_click() {
    addRecipe();
}

function btnUpdateRecipe_click() {
    updateRecipe();
}

function btnClose_click() {
    $("#popupRecipeAdded").popup("close");
}

function pageViewRecipes_show() {
    showAllRecipes();
}

function pageViewARecipe_show() {
    showARecipe();
}

function btnDeleteRecipe_click() {
    deleteRecipe();
}

function btnClearIngredient_click() {
    $("#txtIngredient").val(null);
    $("#txtWeight").val(null);
}

function btnClearRecipe_click() {
    $("#txtRecipeName").val(null);
    $("#txtYield").val(null);
    $("#txtDescription").val(null);
    $("#txtIngredientsNeeded").val(null);
    $("#txtDirections").val(null);

}

function btnChangeQuantity_click() {
    //save yield and ingredient list, txtEditYield, txtEditIngredientsNeeded
    var yield = $("#txtEditYield").val();
    var ingredients = $("#txtEditIngredientsNeeded").val();

    //move location to pageConversion
    $(location).prop('href','#pageConversion');

    //fill in txtServings and txtIngredientList
    $("#txtServings").val(yield);
    $("#txtIngredientList").val(ingredients);
    $("#txtDesiredServing").val(null);
}

function init() {
    $("#btnCalculate").on("click", btnCalculate_click);
    $("#btnClear").on("click", btnClear_click);

    $("#btnSubmitAdd").on("click", btnSubmitAdd_click);
    $("#btnCloseAdd").on("click", btnCloseAdd_click);

    $("#btnUpdate").on("click", btnUpdate_click);

    $("#btnDelete").on("click", btnDelete_click);

    $("#btnConvert").on("click", btnConvert_click);

    $("#pageView").on("pageshow", pageView_show);
    $("#pageEdit").on("pageshow", pageEdit_show);

    $("#pageCalculator").on("pageshow", pageCalculator_show);

    $("#btnDeleteAllIngredients").on("click", btnDeleteAllIngredients_click);
    $("#btnDeleteYes").on("click", btnDeleteYes_click);
    $("#btnDeleteCancel").on("click", btnDeleteCancel_click);

    $("#pageConversion").on("pageshow", pageConversion_show);


    $("#btnAddRecipe").on("click", btnAddRecipe_click);
    $("#btnClose").on("click", btnClose_click);

    $("#btnUpdateRecipe").on("click", btnUpdateRecipe_click);

    $("#pageViewRecipes").on("pageshow", pageViewRecipes_show);

    $("#btnDeleteAllRecipes").on("click", btnDeleteAllRecipes_click);
    $("#btnRecipeYes").on("click", btnRecipeYes_click);
    $("#btnRecipeCancel").on("click", btnRecipeCancel_click);

    $("#pageViewARecipe").on("pageshow", pageViewARecipe_show);


    $("#btnDeleteRecipe").on("click", btnDeleteRecipe_click);

    $("#btnClearIngredient").on("click", btnClearIngredient_click);
    $("#btnClearRecipe").on("click", btnClearRecipe_click);

    $("#btnChangeQuantity").on("click", btnChangeQuantity_click);

}

function initDB(){
    try{
        DB.createDatabase();

        if(db){
            DB.createTables();
        }
        else {
            console.error("Error: Cannot create tables");
        }
    }
    catch (e) {
        console.error("Fatal error with database");
    }
}

$(document).ready(function (){
   init();
   initDB();
});