// Import our database models
import User from "./models/user";
import Animal from "./models/animal";

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
        return User.find(query);
    },
    // Inserts a new animal into the animals collection 
    // in the Zoo database. Returns the promise
    addAnimal: function(data) {
        let animal = new Animal({
            name: data.animalName,
            identification: data.identification,
            age: data.age,
            species: data.species,
            food: data.food,
            health: data.health,
            sex: data.sex
        });
        return animal.save();
    },
    // Grabs all animals inside of the "animals" collection in
    // the Zoo database. Returns the promise
    getAnimals: function() {
        return Animal.find({});
    },
    // determines if the animal exists in the database
    animalExists: function(name) {
        let query = {
            name: name
        };
        return Animal.find(query);
    },
    editAnimal: function(data) {
        
    }
};

// Export the CrudOperations object for reuse around the project
module.exports = CrudOperations;