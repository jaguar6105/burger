// Import MySQL connection.
var connection = require("../config/connection.js");


function printQuestionMarks(num) {
    const arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    const arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


const orm = {
    //gets all data from a provided table
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //insert data into a table
    insertOne: function (tableInput, cols, vals, cb) {
        let queryString = "INSERT INTO " + tableInput;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);


        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //update a row in the table
    updateOne: function (tableInput, objColVals, condition, cb) {
        let queryString = "UPDATE " + tableInput;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
}


module.exports = orm;
