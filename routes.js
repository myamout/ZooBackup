import express from 'express';
// import all of our crud operations
import CrudOperations from './crud';

const router = express.Router();

// If the user does a post request to "/api/add"
// this function is called
router.post('/add', (req, res) => {
    // The "addAnimal" function returns a promise,
    // all this route does is execute the promise
    let animalEntry = CrudOperations.addAnimal(req.body);
    // If the animal was successfully added
    // then we can send a json object back to the frontend
    animalEntry.then((response) => {
        res.send({success: true});
    }).catch((error) => {
        // if the animal wasn't added print out the error
        // and send a json object back to the frontend
        console.log(error);
        res.send({success: false});
    });
});

// If the frontend calls "/api/view"
// we'll run this route's operations
router.get('/view', (req, res) => {
    // save the promise returned by "getAnimals" into
    // animalList variable
    let animalList = CrudOperations.getAnimals();
    // Execute the promise
    animalList.exec((err, animals) => {
        // If there was an error send json object with error to frontend
        if (err) {
            res.send({animals: "error fetching animal list"});
        } else {
            // If success send aniaml array to frontend
            res.send({animals: animals });
        }
    });
});

router.get('/exists', (req, res) => {
    let animalExists = CrudOperations.animalExists(req['query']['name']);
    animalExists.exec((err, animals) => {
        if (err) {
            res.send({ success: false });
        } else if (animals.length === 1) {
            res.send({
                success: true,
                animal: animals[0]
             });
        }
    });
});

router.put('/edit', (req, res) => {
    console.log(req.body);
    res.send({ success: true });
});

// Export the routes so the server can use them
module.exports = router;
