// Import our database models
import User from "./models/user";

// CrudOperations is an object that contains many different functions
// any function that uses the database should go here and return a promise
// for the calling route to use
let CrudOperations = {
    // Takes username string and password string
    // and does a query in the "user" collection in the
    // Zoo database. Returns the promise
    loginUser: function(username, pass) {
        let query = {
            username: username,
            password: pass
        };
        return User.findOne(query);
    }
};

// Export the CrudOperations object for reuse around the project
module.exports = CrudOperations;
