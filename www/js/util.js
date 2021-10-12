// Fatima Lalva Final Assignment
// util.js
//
// Revision History:
//     Fatima Lalva, April 10, 2020: Created

function validate_frmAddRecipe(){
    var form = $("#frmAddRecipe");
    form.validate({
        rules:{
            txtRecipeName:{
                required: true,
                rangelength: [2, 75]
            },
            txtDescription:{
                maxlength: 500
            },
            txtIngredientsNeeded:{
                maxlength: 8000
            },
            txtDirections:{
                maxlength: 8000
            }
        },
        messages:{
            txtRecipeName:{
                required: "Recipe Name is required",
                rangelength: "Recipe Name must be between 2 - 75 chars"
            },
            txtDescription:{
                maxlength: "Max 500 chars"
            },
            txtIngredientsNeeded:{
                maxlength: "Max 8000 chars"
            },
            txtDirections:{
                maxlength: "Max 8000 chars"
            }
        }
    });
    return form.valid();
}

function validate_frmUpdateRecipe(){
    var form = $("#frmUpdateRecipe");
    form.validate({
        rules:{
            txtEditRecipeName:{
                required: true,
                rangelength: [2, 75]
            },
            txtEditDescription:{
                maxlength: 500
            },
            txtEditIngredientsNeeded:{
                maxlength: 8000
            },
            txtEditDirections:{
                maxlength: 8000
            }
        },
        messages:{
            txtRecipeName:{
                required: "Recipe Name is required",
                rangelength: "Recipe Name must be between 2 - 75 chars"
            },
            txtEditDescription:{
                maxlength: "Max 500 chars"
            },
            txtEditIngredientsNeeded:{
                maxlength: "Max 8000 chars"
            },
            txtEditDirections:{
                maxlength: "Max 8000 chars"
            }
        }
    });
    return form.valid();
}

function validate_frmConvert(){
    var form = $("#frmConvert");
    form.validate({
        rules:{
            txtServings:{
                required: true
            },
            txtDesiredServing:{
                required: true
            },
            txtIngredientList:{
                required: true,
            }
        },
        messages:{
            txtServings:{
                required: "Serving is required"
            },
            txtDesiredServing:{
                required: "Desired Serving is required"
            },
            txtIngredientList:{
                required: "Ingredient List is required"
            }
        }
    });
    return form.valid();
}

function validate_frmAdd(){
    var form = $("#frmAdd");
    form.validate({
        rules:{
            txtIngredient:{
                required: true,
                rangelength: [2, 35]
            },
            txtWeight:{
                required: true,
            }
        },
        messages:{
            txtIngredient:{
                required: "Ingredient is required",
                rangelength: "Ingredient must be between 2-35 chars"
            },
            txtWeight:{
                required: "Weight is required"
            }
        }
    });
    return form.valid();
}

function validate_frmEdit(){
    var form = $("#frmEdit");
    form.validate({
        rules:{
            txtIngredientEdit:{
                required: true,
                rangelength: [2, 25]
            },
            txtWeightEdit:{
                required: true,
            }
        },
        messages:{
            txtIngredientEdit:{
                required: "Ingredient is required",
                rangelength: "Ingredient must be between 2-25 chars"
            },
            txtWeightEdit:{
                required: "Weight is required"
            }
        }
    });
    return form.valid();
}

function validate_frmCalculate(){
    var form = $("#frmCalculate");
    form.validate({
        rules:{
            txtAmount:{
                required: true,
                number: true
            }
        },
        messages:{
            txtAmount:{
                required: "Amount is required",
                number: "Must be a valid number"
            }
        }
    });
    return form.valid();
}