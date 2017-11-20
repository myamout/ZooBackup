import express from 'express';
import CrudOperations from './crud';
import elasticsearch from 'elasticsearch';

const router = express.Router();
// connect to our elasticsearch cluster
const client = new elasticsearch.Client({
    host: 'localhost:9200'
});

// Test to make sure the cluster is active
client.ping({
    requestTimeout: 2000
}, ((error) => {
    if (error) {
        console.log('[-] Could not connect to Elastic Cluster at localhost:9200');
    } else {
        console.log('[+] Connected to Elastic Cluster at localhost:9200');
    }
}));

// Adds an animal to the database
router.post('/add', (req, res) => {
    console.log(req.body);
    let count;
    // First we need to get the current count of animals
    // This is the id that will be assigned to the animal
    client.get({
        index: 'animals',
        type: 'id_count',
        id: 1
    }, ((err, response) => {
        if (err) {
            res.send({ success: false });
        } else {
            // Get the count and increment it
            count = response._source.count + 1;
            // Insert the animal document into the index with type animal
            client.index({
                index: 'animals',
                type: 'animal',
                id: count,
                body: req.body
            }, ((err, response) => {
                if (err) {
                    res.send({ success: false });
                } else {
                    // Save the new count back into the index
                    client.index({
                        index: 'animals',
                        type: 'id_count',
                        id: 1,
                        body: {
                            count: count
                        }
                    }, ((err, response) => {
                        if (err) {
                            res.send({ success: false });
                        } else {
                            // Send the success
                            res.send({ success: true });
                        }
                    }));
                }
            }));
        }
    }));
});

// Checks if the animal document exists in the index
// If it does send back the animal object to edit
// Queries the animal index by animal name -> remember each animal gets a unique name
router.get('/exists', (req, res) => {
    const query = 'name:'+req['query']['name'];
    client.search({
        index: 'animals',
        q: query
    }, ((err, response) => {
        if (err) {
            res.send({ success: false });
        }
        if (response.hits.hits.length === 0) {
          res.send({ success: false });
        } else {
          res.send({
              success: true,
              animal: response.hits.hits[0]._source
          });
        }
    }));
});

// Updates the animal document after the user has edited it
router.post('/update', (req, res) => {
    let query = 'name:'+req.body.name;
    client.search({
        index: 'animals',
        q: query
    }, ((err, response) => {
        if (err) {
            res.send({ success: false });
        }
        client.index({
            index: 'animals',
            type: 'animal',
            id: response.hits.hits[0]._id,
            body: req.body
        }, ((err, response) => {
            if (err) {
                res.send({ success: false });
            } else {
                res.send({ success: true });
            }
        }));
    }));
});

// Deletes the animal document based by animal name
router.post('/delete', (req, res) => {
    let query = 'name:'+req.body.name;
    client.search({
        index: 'animals',
        q: query
    }, ((err, response) => {
        if (err) { res.send({ success: false })}
        if (response.hits.hits.length === 0) {
            res.send({ success: false });
        }
        else {
            client.delete({
                index: 'animals',
                type: 'animal',
                id: response.hits.hits[0]._id
            }, ((err, response) => {
                if (err) { res.send({ success: false })}
                else { res.send({ success: true })}
            }));
        }
    }));
});

router.get('/allAnimals', (req, res) => {
    let query = '_type: animal';
    client.search({
        index: 'animals',
        q: query
    }, (err, animals) => {

    });
});

// Export the routes so the server can use them
module.exports = router;
