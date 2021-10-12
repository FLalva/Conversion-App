// Fatima Lalva Final Assignment
// database.js
//
// Revision History:
//     Fatima Lalva, April 10, 2020: Created

var db;

var DB = {
  createDatabase: function() {
      var shortName = "MeasurementsDB";
      var version = "1.0";
      var dispayName = "Database for Ingredient Measurements";
      var dbSize = 2 * 1024 * 1024;

      db = openDatabase(shortName, version, dispayName, dbSize);
    },
    createTables: function() {
      function txFunction(tx) {
          //First Table: UNIT
          var sql = "DROP TABLE IF EXISTS unit;";
          var options = [];

          tx.executeSql(sql, options);

          ///

          sql = "CREATE TABLE IF NOT EXISTS unit(" +
              "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
              "unit_name VARCHAR(10) NOT NULL);";
          tx.executeSql(sql, options);

          //Insert values into table, just 2 for now
          sql = "INSERT INTO unit(unit_name) VALUES('grams');";
          tx.executeSql(sql, options);

          sql = "INSERT INTO unit(unit_name) VALUES('cups');";
          tx.executeSql(sql, options);

          //Second Table: Ingredient

          sql = "CREATE TABLE IF NOT EXISTS ingredient(" +
              "ingredient_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
              "ingredient_name VARCHAR(35) NOT NULL UNIQUE," +
              "grams DECIMAL NOT NULL," +
              "cups DECIMAL NOT NULL);";

          tx.executeSql(sql, options);

          //Insert some basic values into table
          sql = "INSERT INTO ingredient(ingredient_name, grams, cups) " +
              "VALUES('Butter', 227, 1);";
          tx.executeSql(sql, options);

          sql = "INSERT INTO ingredient(ingredient_name, grams, cups) " +
              "VALUES('Flour, All Purpose', 128, 1);";
          tx.executeSql(sql, options);

          sql = "INSERT INTO ingredient(ingredient_name, grams, cups) " +
              "VALUES('Sugar, Granulated', 200, 1);";
          tx.executeSql(sql, options);

          sql = "INSERT INTO ingredient(ingredient_name, grams, cups) " +
              "VALUES('Sugar, Brown', 220, 1);";
          tx.executeSql(sql, options);

          //Third Table: Recipe
          sql = "CREATE TABLE IF NOT EXISTS recipe(" +
              "recipe_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
              "recipe_name VARCHAR(75) NOT NULL," +
              "yield DECIMAL," +
              "description VARCHAR(500)," +
              "ingredient_list VARCHAR(8000)," +
              "directions VARCHAR(8000));";

          tx.executeSql(sql, options);
      }
      db.transaction(txFunction);
    }
};