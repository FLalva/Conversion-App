// Fatima Lalva Final Assignment
// STB-DAL.js
//
// Revision History:
//     Fatima Lalva, April 10, 2020: Created

var recipe = {
    insert: function(options, callback){
        function txFunction(tx) {
            var sql = "INSERT INTO recipe(recipe_name, yield, description, ingredient_list, directions) " +
                "VALUES(?,?,?,?,?);";
            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    select: function(options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM recipe WHERE recipe_id=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    selectAll: function(options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM recipe ORDER BY LOWER(recipe_name);";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    update: function(options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE recipe SET recipe_name=?, yield=?, description=?, ingredient_list=?, directions=? WHERE recipe_id=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    delete: function(options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM recipe WHERE recipe_id=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    deleteAll: function(options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM recipe;";

            tx.executeSql(sql, options, callback);
        }

        db.transaction(txFunction);
    }
};

var unit = {
    selectAll: function(options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM unit;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    }
};

var ingredient = {
    insert: function(options, callback){
        function txFunction(tx) {
            var sql = "INSERT INTO ingredient(ingredient_name, grams, cups) " +
            "VALUES(?,?,?);";
            tx.executeSql(sql, options, callback);
        }

        function errorHandler() {
            console.log("ingredient Exists");
            // txtIngredient-error
            // var errorMessage = document.getElementById("ingredientError");
            // errorMessage.innerHTML = "This ingredient already exists";
            //
            // //change style
            // document.getElementById("txtIngredient").style.border = "1px solid red";
            alert("This ingredient exists already");
        }
        db.transaction(txFunction, errorHandler);
    },
    select: function(options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM ingredient WHERE ingredient_id=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    selectAll: function(options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM ingredient ORDER BY LOWER(ingredient_name);";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    update: function(options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE ingredient SET ingredient_name=?, grams=?, cups=? WHERE ingredient_id=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    delete: function(options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM ingredient WHERE ingredient_id=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    deleteAll: function(options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM ingredient;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    },
    find: function(options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM ingredient WHERE UPPER(ingredient_name)=?;";

            tx.executeSql(sql, options, callback);
        }
        db.transaction(txFunction);
    }
};